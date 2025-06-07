import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type GitlabUserDocument = GitlabUser & Document;

@Schema({ timestamps: true })
export class GitlabUser {
  @ApiProperty({ description: 'GitLab user ID', example: 123 })
  @Prop({ required: true })
  gitlabUserId: number;

  @ApiProperty({ description: 'Username', example: 'john.doe' })
  @Prop({ required: true })
  username: string;

  @ApiProperty({ description: 'Email address', example: 'john.doe@example.com' })
  @Prop({ required: true })
  email: string;

  @ApiProperty({ description: 'Full name', example: 'John Doe' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'User state', example: 'active' })
  @Prop({ default: 'active' })
  state: string;

  @ApiProperty({ description: 'Avatar URL' })
  @Prop()
  avatarUrl?: string;

  @ApiProperty({ description: 'Web URL to user profile' })
  @Prop()
  webUrl?: string;

  @ApiProperty({ description: 'User bio' })
  @Prop()
  bio?: string;

  @ApiProperty({ description: 'Location' })
  @Prop()
  location?: string;

  @ApiProperty({ description: 'Public email' })
  @Prop()
  publicEmail?: string;

  @ApiProperty({ description: 'Skype ID' })
  @Prop()
  skype?: string;

  @ApiProperty({ description: 'LinkedIn profile' })
  @Prop()
  linkedin?: string;

  @ApiProperty({ description: 'Twitter handle' })
  @Prop()
  twitter?: string;

  @ApiProperty({ description: 'Website URL' })
  @Prop()
  websiteUrl?: string;

  @ApiProperty({ description: 'Organization' })
  @Prop()
  organization?: string;

  @ApiProperty({ description: 'Job title' })
  @Prop()
  jobTitle?: string;

  @ApiProperty({ description: 'Is admin user', example: false })
  @Prop({ default: false })
  isAdmin: boolean;

  @ApiProperty({ description: 'Can create group', example: true })
  @Prop({ default: true })
  canCreateGroup: boolean;

  @ApiProperty({ description: 'Can create project', example: true })
  @Prop({ default: true })
  canCreateProject: boolean;

  @ApiProperty({ description: 'Two factor enabled', example: false })
  @Prop({ default: false })
  twoFactorEnabled: boolean;

  @ApiProperty({ description: 'External user', example: false })
  @Prop({ default: false })
  external: boolean;

  @ApiProperty({ description: 'Private profile', example: false })
  @Prop({ default: false })
  privateProfile: boolean;

  @ApiProperty({ description: 'Commit email' })
  @Prop()
  commitEmail?: string;

  @ApiProperty({ description: 'Current sign in at' })
  @Prop()
  currentSignInAt?: Date;

  @ApiProperty({ description: 'Last sign in at' })
  @Prop()
  lastSignInAt?: Date;

  @ApiProperty({ description: 'Confirmed at' })
  @Prop()
  confirmedAt?: Date;

  @ApiProperty({ description: 'Last activity on' })
  @Prop()
  lastActivityOn?: Date;

  @ApiProperty({ description: 'Theme ID', example: 1 })
  @Prop()
  themeId?: number;

  @ApiProperty({ description: 'Color scheme ID', example: 1 })
  @Prop()
  colorSchemeId?: number;

  @ApiProperty({ description: 'Projects limit', example: 100000 })
  @Prop({ default: 100000 })
  projectsLimit: number;

  @ApiProperty({ description: 'Current sign in IP' })
  @Prop()
  currentSignInIp?: string;

  @ApiProperty({ description: 'Last sign in IP' })
  @Prop()
  lastSignInIp?: string;

  @ApiProperty({ description: 'User identities' })
  @Prop({ type: [Object], default: [] })
  identities: any[];

  @ApiProperty({ description: 'User groups' })
  @Prop({ type: [Object], default: [] })
  groups: any[];

  @ApiProperty({ description: 'User projects' })
  @Prop({ type: [Object], default: [] })
  projects: any[];

  @ApiProperty({ description: 'Access level in WebBuilder', example: 'developer' })
  @Prop({ default: 'developer' })
  accessLevel: string;

  @ApiProperty({ description: 'Tenant ID for multi-tenancy' })
  @Prop({ required: true })
  tenantId: string;

  @ApiProperty({ description: 'WebBuilder user ID' })
  @Prop()
  webbuilderUserId?: string;

  @ApiProperty({ description: 'Created by user ID' })
  @Prop()
  createdBy?: string;

  @ApiProperty({ description: 'User status in WebBuilder', example: 'active' })
  @Prop({ default: 'active' })
  status: string;

  @ApiProperty({ description: 'Sync status with GitLab', example: 'synced' })
  @Prop({ default: 'synced' })
  syncStatus: string;

  @ApiProperty({ description: 'Last sync date' })
  @Prop()
  lastSyncAt?: Date;

  @ApiProperty({ description: 'GitLab access token (encrypted)' })
  @Prop()
  accessToken?: string;

  @ApiProperty({ description: 'GitLab refresh token (encrypted)' })
  @Prop()
  refreshToken?: string;

  @ApiProperty({ description: 'Token expires at' })
  @Prop()
  tokenExpiresAt?: Date;

  @ApiProperty({ description: 'GitLab server configuration' })
  @Prop({
    type: Object,
    default: {
      baseUrl: 'http://localhost:8080',
      apiVersion: 'v4'
    }
  })
  gitlabConfig: {
    baseUrl: string;
    apiVersion: string;
  };
}

export const GitlabUserSchema = SchemaFactory.createForClass(GitlabUser);

// Create indexes for performance and tenant isolation
GitlabUserSchema.index({ tenantId: 1, gitlabUserId: 1 }, { unique: true });
GitlabUserSchema.index({ tenantId: 1, username: 1 });
GitlabUserSchema.index({ tenantId: 1, email: 1 });
GitlabUserSchema.index({ tenantId: 1, webbuilderUserId: 1 });
GitlabUserSchema.index({ tenantId: 1, status: 1 });
GitlabUserSchema.index({ tenantId: 1, syncStatus: 1 });
GitlabUserSchema.index({ tenantId: 1, accessLevel: 1 });
