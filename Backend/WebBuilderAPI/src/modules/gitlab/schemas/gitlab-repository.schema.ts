import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type GitlabRepositoryDocument = GitlabRepository & Document;

@Schema({ timestamps: true })
export class GitlabRepository {
  @ApiProperty({ description: 'GitLab project ID', example: 123 })
  @Prop({ required: true })
  gitlabProjectId: number;

  @ApiProperty({ description: 'Repository name', example: 'my-webbuilder-app' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Repository description' })
  @Prop()
  description?: string;

  @ApiProperty({ description: 'Repository path/slug', example: 'my-webbuilder-app' })
  @Prop({ required: true })
  path: string;

  @ApiProperty({ description: 'Repository namespace/group', example: 'webbuilder' })
  @Prop({ required: true })
  namespace: string;

  @ApiProperty({ description: 'Full repository path', example: 'webbuilder/my-webbuilder-app' })
  @Prop({ required: true })
  fullPath: string;

  @ApiProperty({ description: 'Repository visibility', enum: ['private', 'internal', 'public'] })
  @Prop({ enum: ['private', 'internal', 'public'], default: 'private' })
  visibility: string;

  @ApiProperty({ description: 'Repository web URL' })
  @Prop({ required: true })
  webUrl: string;

  @ApiProperty({ description: 'Repository SSH URL' })
  @Prop({ required: true })
  sshUrl: string;

  @ApiProperty({ description: 'Repository HTTP URL' })
  @Prop({ required: true })
  httpUrl: string;

  @ApiProperty({ description: 'Default branch', example: 'main' })
  @Prop({ default: 'main' })
  defaultBranch: string;

  @ApiProperty({ description: 'Repository tags', type: [String] })
  @Prop({ type: [String], default: [] })
  tags: string[];

  @ApiProperty({ description: 'Repository topics', type: [String] })
  @Prop({ type: [String], default: [] })
  topics: string[];

  @ApiProperty({ description: 'Is repository archived', example: false })
  @Prop({ default: false })
  archived: boolean;

  @ApiProperty({ description: 'Repository avatar URL' })
  @Prop()
  avatarUrl?: string;

  @ApiProperty({ description: 'Star count', example: 0 })
  @Prop({ default: 0 })
  starCount: number;

  @ApiProperty({ description: 'Fork count', example: 0 })
  @Prop({ default: 0 })
  forkCount: number;

  @ApiProperty({ description: 'Last activity date' })
  @Prop()
  lastActivityAt?: Date;

  @ApiProperty({ description: 'Repository statistics' })
  @Prop({
    type: Object,
    default: {
      commitCount: 0,
      storageSize: 0,
      repositorySize: 0,
      lfsObjectsSize: 0,
      jobArtifactsSize: 0
    }
  })
  statistics: {
    commitCount: number;
    storageSize: number;
    repositorySize: number;
    lfsObjectsSize: number;
    jobArtifactsSize: number;
  };

  @ApiProperty({ description: 'CI/CD configuration' })
  @Prop({
    type: Object,
    default: {
      enabled: true,
      autoDevops: false,
      buildTimeout: 3600,
      sharedRunnersEnabled: true
    }
  })
  ciConfig: {
    enabled: boolean;
    autoDevops: boolean;
    buildTimeout: number;
    sharedRunnersEnabled: boolean;
  };

  @ApiProperty({ description: 'Repository permissions' })
  @Prop({
    type: Object,
    default: {
      projectAccess: null,
      groupAccess: null
    }
  })
  permissions: {
    projectAccess: any;
    groupAccess: any;
  };

  @ApiProperty({ description: 'Tenant ID for multi-tenancy' })
  @Prop({ required: true })
  tenantId: string;

  @ApiProperty({ description: 'WebBuilder application ID' })
  @Prop()
  applicationId?: string;

  @ApiProperty({ description: 'Repository owner user ID' })
  @Prop()
  ownerId?: string;

  @ApiProperty({ description: 'Created by user ID' })
  @Prop()
  createdBy?: string;

  @ApiProperty({ description: 'Repository status', example: 'active' })
  @Prop({ default: 'active' })
  status: string;

  @ApiProperty({ description: 'Sync status with GitLab', example: 'synced' })
  @Prop({ default: 'synced' })
  syncStatus: string;

  @ApiProperty({ description: 'Last sync date' })
  @Prop()
  lastSyncAt?: Date;

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

export const GitlabRepositorySchema = SchemaFactory.createForClass(GitlabRepository);

// Create indexes for performance and tenant isolation
GitlabRepositorySchema.index({ tenantId: 1, gitlabProjectId: 1 }, { unique: true });
GitlabRepositorySchema.index({ tenantId: 1, name: 1 });
GitlabRepositorySchema.index({ tenantId: 1, fullPath: 1 });
GitlabRepositorySchema.index({ tenantId: 1, applicationId: 1 });
GitlabRepositorySchema.index({ tenantId: 1, ownerId: 1 });
GitlabRepositorySchema.index({ tenantId: 1, status: 1 });
GitlabRepositorySchema.index({ tenantId: 1, syncStatus: 1 });
