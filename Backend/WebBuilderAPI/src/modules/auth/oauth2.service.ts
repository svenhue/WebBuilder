import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { OAuth2Client, OAuth2ClientDocument } from './schemas/oauth2-client.schema';
import { RefreshToken, RefreshTokenDocument } from './schemas/refresh-token.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class OAuth2Service {
  constructor(
    @InjectModel(OAuth2Client.name) private oauth2ClientModel: Model<OAuth2ClientDocument>,
    @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshTokenDocument>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private usersService: UsersService,
  ) {}

  // OAuth2 Authorization Code Flow
  async generateAuthorizationCode(clientId: string, userId: string, scope: string[], redirectUri: string): Promise<string> {
    const client = await this.validateClient(clientId);
    
    if (!client.redirectUris.includes(redirectUri)) {
      throw new BadRequestException('Invalid redirect URI');
    }

    const code = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store authorization code (in production, use Redis or database)
    await this.storeAuthorizationCode(code, {
      clientId,
      userId,
      scope,
      redirectUri,
      expiresAt,
    });

    return code;
  }

  async exchangeCodeForToken(
    code: string,
    clientId: string,
    clientSecret: string,
    redirectUri: string,
    codeVerifier?: string
  ): Promise<any> {
    const client = await this.validateClient(clientId, clientSecret);
    const authCode = await this.getAuthorizationCode(code);

    if (!authCode || authCode.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired authorization code');
    }

    if (authCode.clientId !== clientId || authCode.redirectUri !== redirectUri) {
      throw new UnauthorizedException('Invalid authorization code');
    }

    // PKCE validation if code_verifier is provided
    if (codeVerifier && authCode.codeChallenge) {
      const computedChallenge = crypto
        .createHash('sha256')
        .update(codeVerifier)
        .digest('base64url');
      
      if (computedChallenge !== authCode.codeChallenge) {
        throw new UnauthorizedException('Invalid code verifier');
      }
    }

    const user = await this.usersService.findById(authCode.userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Generate tokens
    const accessToken = await this.generateAccessToken(user, authCode.scope);
    const refreshToken = await this.generateRefreshToken(user.id, clientId);

    // Clean up authorization code
    await this.deleteAuthorizationCode(code);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: 'Bearer',
      expires_in: 3600,
      scope: authCode.scope.join(' '),
    };
  }

  // Client Credentials Flow
  async clientCredentialsGrant(clientId: string, clientSecret: string, scope: string[]): Promise<any> {
    const client = await this.validateClient(clientId, clientSecret);
    
    // Validate requested scopes against client's allowed scopes
    const allowedScopes = scope.filter(s => client.scopes.includes(s));
    
    const accessToken = await this.generateClientAccessToken(client, allowedScopes);

    return {
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: 3600,
      scope: allowedScopes.join(' '),
    };
  }

  // Refresh Token Flow
  async refreshAccessToken(refreshToken: string, clientId: string, clientSecret?: string): Promise<any> {
    const client = await this.validateClient(clientId, clientSecret);
    const tokenDoc = await this.refreshTokenModel.findOne({ 
      token: refreshToken, 
      clientId,
      expiresAt: { $gt: new Date() }
    }).exec();

    if (!tokenDoc) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = await this.usersService.findById(tokenDoc.userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Generate new access token
    const accessToken = await this.generateAccessToken(user, tokenDoc.scope);

    // Optionally rotate refresh token
    let newRefreshToken = refreshToken;
    if (client.rotateRefreshTokens) {
      await this.refreshTokenModel.deleteOne({ _id: tokenDoc._id }).exec();
      newRefreshToken = await this.generateRefreshToken(user.id, clientId);
    }

    return {
      access_token: accessToken,
      refresh_token: newRefreshToken,
      token_type: 'Bearer',
      expires_in: 3600,
      scope: tokenDoc.scope.join(' '),
    };
  }

  // Token validation
  async validateAccessToken(token: string): Promise<any> {
    try {
      const payload = this.jwtService.verify(token);
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }

  // Client management
  async createClient(clientData: any): Promise<OAuth2ClientDocument> {
    const clientId = crypto.randomBytes(16).toString('hex');
    const clientSecret = crypto.randomBytes(32).toString('hex');

    const client = new this.oauth2ClientModel({
      ...clientData,
      clientId,
      clientSecret: await this.hashSecret(clientSecret),
    });

    await client.save();
    
    // Return client with plain text secret (only time it's visible)
    return {
      ...client.toObject(),
      clientSecret,
    } as OAuth2ClientDocument;
  }

  async validateClient(clientId: string, clientSecret?: string): Promise<OAuth2ClientDocument> {
    const client = await this.oauth2ClientModel.findOne({ clientId }).exec();
    
    if (!client) {
      throw new UnauthorizedException('Invalid client');
    }

    if (clientSecret && !(await this.verifySecret(clientSecret, client.clientSecret))) {
      throw new UnauthorizedException('Invalid client credentials');
    }

    return client;
  }

  // Helper methods
  private async generateAccessToken(user: any, scope: string[]): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
      scope: scope.join(' '),
      type: 'access_token',
    };

    return this.jwtService.sign(payload, {
      expiresIn: '1h',
    });
  }

  private async generateClientAccessToken(client: OAuth2ClientDocument, scope: string[]): Promise<string> {
    const payload = {
      sub: client.clientId,
      client_id: client.clientId,
      scope: scope.join(' '),
      type: 'client_credentials',
    };

    return this.jwtService.sign(payload, {
      expiresIn: '1h',
    });
  }

  private async generateRefreshToken(userId: string, clientId: string): Promise<string> {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    const refreshToken = new this.refreshTokenModel({
      token,
      userId,
      clientId,
      expiresAt,
      scope: ['read', 'write'], // Default scope, should be configurable
    });

    await refreshToken.save();
    return token;
  }

  private async hashSecret(secret: string): Promise<string> {
    return crypto.createHash('sha256').update(secret).digest('hex');
  }

  private async verifySecret(plainSecret: string, hashedSecret: string): Promise<boolean> {
    const hash = crypto.createHash('sha256').update(plainSecret).digest('hex');
    return hash === hashedSecret;
  }

  // Authorization code storage (in production, use Redis)
  private authCodes = new Map<string, any>();

  private async storeAuthorizationCode(code: string, data: any): Promise<void> {
    this.authCodes.set(code, data);
    // Set cleanup timeout
    setTimeout(() => {
      this.authCodes.delete(code);
    }, 10 * 60 * 1000); // 10 minutes
  }

  private async getAuthorizationCode(code: string): Promise<any> {
    return this.authCodes.get(code);
  }

  private async deleteAuthorizationCode(code: string): Promise<void> {
    this.authCodes.delete(code);
  }
}
