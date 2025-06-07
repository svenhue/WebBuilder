import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Res,
  Req,
  UseGuards,
  UseInterceptors,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { Response, Request } from 'express';
import { OAuth2Service } from './oauth2.service';
import { TenantInterceptor } from '../../shared/tenancy/tenant.interceptor';

@ApiTags('OAuth2')
@Controller('oauth2')
@UseInterceptors(TenantInterceptor)
export class OAuth2Controller {
  constructor(private readonly oauth2Service: OAuth2Service) {}

  @Get('authorize')
  @ApiOperation({ summary: 'OAuth2 Authorization Endpoint' })
  @ApiQuery({ name: 'response_type', description: 'Response type (code)', example: 'code' })
  @ApiQuery({ name: 'client_id', description: 'Client ID' })
  @ApiQuery({ name: 'redirect_uri', description: 'Redirect URI' })
  @ApiQuery({ name: 'scope', description: 'Requested scopes', required: false })
  @ApiQuery({ name: 'state', description: 'State parameter', required: false })
  @ApiQuery({ name: 'code_challenge', description: 'PKCE code challenge', required: false })
  @ApiQuery({ name: 'code_challenge_method', description: 'PKCE challenge method', required: false })
  @ApiResponse({ status: 302, description: 'Redirect to authorization page or callback' })
  async authorize(
    @Query('response_type') responseType: string,
    @Query('client_id') clientId: string,
    @Query('redirect_uri') redirectUri: string,
    @Req() req: Request,
    @Res() res: Response,
    @Query('scope') scope?: string,
    @Query('state') state?: string,
    @Query('code_challenge') codeChallenge?: string,
    @Query('code_challenge_method') codeChallengeMethod?: string,
  ) {
    // Validate required parameters
    if (!responseType || !clientId || !redirectUri) {
      throw new BadRequestException('Missing required parameters');
    }

    if (responseType !== 'code') {
      throw new BadRequestException('Unsupported response type');
    }

    try {
      // Validate client and redirect URI
      await this.oauth2Service.validateClient(clientId);

      // In a real implementation, you would:
      // 1. Check if user is authenticated
      // 2. Show consent screen if needed
      // 3. Generate authorization code after user consent
      
      // For this example, we'll assume user is authenticated and consents
      // In production, implement proper authentication and consent flow
      
      const userId = (req as any).user?.id || 'demo-user-id'; // Get from authenticated user
      const requestedScopes = scope ? scope.split(' ') : ['read'];

      const authCode = await this.oauth2Service.generateAuthorizationCode(
        clientId,
        userId,
        requestedScopes,
        redirectUri
      );

      // Build redirect URL with authorization code
      const redirectUrl = new URL(redirectUri);
      redirectUrl.searchParams.set('code', authCode);
      if (state) {
        redirectUrl.searchParams.set('state', state);
      }

      return res.redirect(redirectUrl.toString());
    } catch (error) {
      // Redirect to error page or back to client with error
      const redirectUrl = new URL(redirectUri);
      redirectUrl.searchParams.set('error', 'server_error');
      redirectUrl.searchParams.set('error_description', error.message);
      if (state) {
        redirectUrl.searchParams.set('state', state);
      }
      return res.redirect(redirectUrl.toString());
    }
  }

  @Post('token')
  @ApiOperation({ summary: 'OAuth2 Token Endpoint' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        grant_type: { type: 'string', example: 'authorization_code' },
        code: { type: 'string', description: 'Authorization code' },
        redirect_uri: { type: 'string', description: 'Redirect URI' },
        client_id: { type: 'string', description: 'Client ID' },
        client_secret: { type: 'string', description: 'Client secret' },
        code_verifier: { type: 'string', description: 'PKCE code verifier' },
        refresh_token: { type: 'string', description: 'Refresh token for refresh grant' },
        scope: { type: 'string', description: 'Requested scopes for client credentials' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Token response' })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @ApiResponse({ status: 401, description: 'Invalid client credentials' })
  async token(@Body() body: any) {
    const {
      grant_type,
      code,
      redirect_uri,
      client_id,
      client_secret,
      code_verifier,
      refresh_token,
      scope,
    } = body;

    if (!grant_type || !client_id) {
      throw new BadRequestException('Missing required parameters');
    }

    try {
      switch (grant_type) {
        case 'authorization_code':
          if (!code || !redirect_uri) {
            throw new BadRequestException('Missing code or redirect_uri');
          }
          return await this.oauth2Service.exchangeCodeForToken(
            code,
            client_id,
            client_secret,
            redirect_uri,
            code_verifier
          );

        case 'client_credentials':
          if (!client_secret) {
            throw new BadRequestException('Missing client_secret');
          }
          const requestedScopes = scope ? scope.split(' ') : ['read'];
          return await this.oauth2Service.clientCredentialsGrant(
            client_id,
            client_secret,
            requestedScopes
          );

        case 'refresh_token':
          if (!refresh_token) {
            throw new BadRequestException('Missing refresh_token');
          }
          return await this.oauth2Service.refreshAccessToken(
            refresh_token,
            client_id,
            client_secret
          );

        default:
          throw new BadRequestException('Unsupported grant type');
      }
    } catch (error) {
      if (error instanceof UnauthorizedException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Invalid request');
    }
  }

  @Post('revoke')
  @ApiOperation({ summary: 'OAuth2 Token Revocation Endpoint' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string', description: 'Token to revoke' },
        token_type_hint: { type: 'string', description: 'Token type hint', enum: ['access_token', 'refresh_token'] },
        client_id: { type: 'string', description: 'Client ID' },
        client_secret: { type: 'string', description: 'Client secret' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Token revoked successfully' })
  async revoke(@Body() body: any) {
    const { token, token_type_hint, client_id, client_secret } = body;

    if (!token || !client_id) {
      throw new BadRequestException('Missing required parameters');
    }

    // Validate client
    await this.oauth2Service.validateClient(client_id, client_secret);

    // Revoke token (implement in service)
    // For now, return success
    return { message: 'Token revoked successfully' };
  }

  @Get('userinfo')
  @ApiOperation({ summary: 'OAuth2 UserInfo Endpoint' })
  @ApiResponse({ status: 200, description: 'User information' })
  @ApiResponse({ status: 401, description: 'Invalid or missing access token' })
  async userinfo(@Req() req: Request) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid authorization header');
    }

    const token = authHeader.substring(7);
    const payload = await this.oauth2Service.validateAccessToken(token);

    // Return user information based on token payload and scopes
    return {
      sub: payload.sub,
      email: payload.email,
      // Add other user info based on scopes
    };
  }

  @Get('.well-known/openid_configuration')
  @ApiOperation({ summary: 'OpenID Connect Discovery Endpoint' })
  @ApiResponse({ status: 200, description: 'OpenID Connect configuration' })
  async openidConfiguration(@Req() req: Request) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    
    return {
      issuer: baseUrl,
      authorization_endpoint: `${baseUrl}/oauth2/authorize`,
      token_endpoint: `${baseUrl}/oauth2/token`,
      userinfo_endpoint: `${baseUrl}/oauth2/userinfo`,
      revocation_endpoint: `${baseUrl}/oauth2/revoke`,
      jwks_uri: `${baseUrl}/oauth2/.well-known/jwks.json`,
      response_types_supported: ['code'],
      grant_types_supported: ['authorization_code', 'client_credentials', 'refresh_token'],
      subject_types_supported: ['public'],
      id_token_signing_alg_values_supported: ['RS256'],
      scopes_supported: ['openid', 'profile', 'email', 'read', 'write'],
      token_endpoint_auth_methods_supported: ['client_secret_post', 'client_secret_basic'],
      code_challenge_methods_supported: ['S256'],
    };
  }

  @Get('.well-known/jwks.json')
  @ApiOperation({ summary: 'JSON Web Key Set Endpoint' })
  @ApiResponse({ status: 200, description: 'JSON Web Key Set' })
  async jwks() {
    // In production, return actual JWK set for token verification
    return {
      keys: [
        // Add your public keys here for JWT verification
      ]
    };
  }

  // Client Management Endpoints (for admin use)
  @Post('clients')
  @ApiOperation({ summary: 'Create OAuth2 Client' })
  @ApiResponse({ status: 201, description: 'Client created successfully' })
  async createClient(@Body() clientData: any) {
    return await this.oauth2Service.createClient(clientData);
  }
}
