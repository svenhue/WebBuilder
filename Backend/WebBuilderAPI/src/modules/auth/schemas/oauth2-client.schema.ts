import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type OAuth2ClientDocument = OAuth2Client & Document;

@Schema({ timestamps: true })
export class OAuth2Client {
  @ApiProperty({ description: 'Client ID', example: 'abc123def456' })
  @Prop({ required: true, unique: true })
  clientId: string;

  @ApiProperty({ description: 'Client secret (hashed)' })
  @Prop({ required: true })
  clientSecret: string;

  @ApiProperty({ description: 'Client name', example: 'My WebBuilder App' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Client description' })
  @Prop()
  description?: string;

  @ApiProperty({ description: 'Redirect URIs', type: [String] })
  @Prop({ type: [String], required: true })
  redirectUris: string[];

  @ApiProperty({ description: 'Allowed scopes', type: [String] })
  @Prop({ type: [String], default: ['read'] })
  scopes: string[];

  @ApiProperty({ description: 'Grant types', type: [String] })
  @Prop({ 
    type: [String], 
    default: ['authorization_code', 'refresh_token'],
    enum: ['authorization_code', 'client_credentials', 'refresh_token', 'password']
  })
  grantTypes: string[];

  @ApiProperty({ description: 'Is public client (no secret required)', example: false })
  @Prop({ default: false })
  isPublic: boolean;

  @ApiProperty({ description: 'Supports PKCE', example: true })
  @Prop({ default: true })
  supportsPkce: boolean;

  @ApiProperty({ description: 'Rotate refresh tokens', example: false })
  @Prop({ default: false })
  rotateRefreshTokens: boolean;

  @ApiProperty({ description: 'Access token lifetime in seconds', example: 3600 })
  @Prop({ default: 3600 })
  accessTokenLifetime: number;

  @ApiProperty({ description: 'Refresh token lifetime in seconds', example: 2592000 })
  @Prop({ default: 2592000 }) // 30 days
  refreshTokenLifetime: number;

  @ApiProperty({ description: 'Client is active', example: true })
  @Prop({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Tenant ID for multi-tenancy' })
  @Prop({ required: true })
  tenantId: string;

  @ApiProperty({ description: 'Created by user ID' })
  @Prop()
  createdBy?: string;

  @ApiProperty({ description: 'Client logo URL' })
  @Prop()
  logoUrl?: string;

  @ApiProperty({ description: 'Client website URL' })
  @Prop()
  websiteUrl?: string;

  @ApiProperty({ description: 'Terms of service URL' })
  @Prop()
  tosUrl?: string;

  @ApiProperty({ description: 'Privacy policy URL' })
  @Prop()
  privacyPolicyUrl?: string;
}

export const OAuth2ClientSchema = SchemaFactory.createForClass(OAuth2Client);

// Create indexes for performance and tenant isolation
OAuth2ClientSchema.index({ tenantId: 1, clientId: 1 }, { unique: true });
OAuth2ClientSchema.index({ tenantId: 1, isActive: 1 });
OAuth2ClientSchema.index({ tenantId: 1, createdBy: 1 });
