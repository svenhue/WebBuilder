import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { AuditableSchema } from '@/shared/database/auditing';

export type PermissionGrantDocument = PermissionGrant & Document;

export enum GrantType {
  USER = 'user',
  ROLE = 'role',
  GROUP = 'group',
  ORGANIZATION = 'organization'
}

export enum PermissionAction {
  READ = 'read',
  WRITE = 'write',
  DELETE = 'delete',
  EXECUTE = 'execute',
  ADMIN = 'admin'
}

export enum ResourceType {
  TEMPLATE = 'template',
  APPLICATION = 'application',
  COMPONENT = 'component',
  ASSET = 'asset',
  WORKSPACE = 'workspace'
}

@Schema({ timestamps: true })
export class PermissionGrant extends AuditableSchema {

  @ApiProperty({ description: 'Permission identifier', example: 'template.read' })
  @Prop({ required: true })
  permissionId: string;

  @ApiProperty({ description: 'Permission Name' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Provider Key' })
  @Prop({ required: true })
  providerKey: string;

  @ApiProperty({ description: 'Provider Name' })
  @Prop({ required: true })
  providerName: string;

}

export const PermissionGrantSchema = SchemaFactory.createForClass(PermissionGrant);

// Indexes for performance
PermissionGrantSchema.index({ grantId: 1, grantType: 1 });
PermissionGrantSchema.index({ resourceType: 1, resourceId: 1 });
PermissionGrantSchema.index({ permissionId: 1 });
PermissionGrantSchema.index({ isActive: 1, expiresAt: 1 });
