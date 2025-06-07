import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type RefreshTokenDocument = RefreshToken & Document;

@Schema({ timestamps: true })
export class RefreshToken {
  @ApiProperty({ description: 'Refresh token value' })
  @Prop({ required: true, unique: true })
  token: string;

  @ApiProperty({ description: 'User ID this token belongs to' })
  @Prop({ required: true })
  userId: string;

  @ApiProperty({ description: 'Client ID that issued this token' })
  @Prop({ required: true })
  clientId: string;

  @ApiProperty({ description: 'Token scopes', type: [String] })
  @Prop({ type: [String], required: true })
  scope: string[];

  @ApiProperty({ description: 'Token expiration date' })
  @Prop({ required: true })
  expiresAt: Date;

  @ApiProperty({ description: 'Is token revoked', example: false })
  @Prop({ default: false })
  isRevoked: boolean;

  @ApiProperty({ description: 'Tenant ID for multi-tenancy' })
  @Prop({ required: true })
  tenantId: string;

  @ApiProperty({ description: 'IP address when token was created' })
  @Prop()
  ipAddress?: string;

  @ApiProperty({ description: 'User agent when token was created' })
  @Prop()
  userAgent?: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);

// Create indexes for performance and cleanup
RefreshTokenSchema.index({ token: 1 }, { unique: true });
RefreshTokenSchema.index({ userId: 1, clientId: 1 });
RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index
RefreshTokenSchema.index({ tenantId: 1, userId: 1 });
RefreshTokenSchema.index({ tenantId: 1, clientId: 1 });
