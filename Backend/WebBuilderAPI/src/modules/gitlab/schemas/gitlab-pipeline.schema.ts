import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type GitlabPipelineDocument = GitlabPipeline & Document;

@Schema({ timestamps: true })
export class GitlabPipeline {
  @ApiProperty({ description: 'GitLab pipeline ID', example: 123 })
  @Prop({ required: true })
  gitlabPipelineId: number;

  @ApiProperty({ description: 'GitLab project ID', example: 456 })
  @Prop({ required: true })
  gitlabProjectId: number;

  @ApiProperty({ description: 'Pipeline status', example: 'success' })
  @Prop({ required: true })
  status: string;

  @ApiProperty({ description: 'Pipeline reference (branch/tag)', example: 'main' })
  @Prop({ required: true })
  ref: string;

  @ApiProperty({ description: 'Commit SHA', example: 'a1b2c3d4e5f6' })
  @Prop({ required: true })
  sha: string;

  @ApiProperty({ description: 'Before SHA' })
  @Prop()
  beforeSha?: string;

  @ApiProperty({ description: 'Pipeline tag', example: false })
  @Prop({ default: false })
  tag: boolean;

  @ApiProperty({ description: 'YAML errors' })
  @Prop({ type: [String], default: [] })
  yamlErrors: string[];

  @ApiProperty({ description: 'Pipeline user' })
  @Prop({ type: Object })
  user?: {
    id: number;
    username: string;
    name: string;
    state: string;
    avatarUrl?: string;
    webUrl?: string;
  };

  @ApiProperty({ description: 'Pipeline created at' })
  @Prop()
  createdAt?: Date;

  @ApiProperty({ description: 'Pipeline updated at' })
  @Prop()
  updatedAt?: Date;

  @ApiProperty({ description: 'Pipeline started at' })
  @Prop()
  startedAt?: Date;

  @ApiProperty({ description: 'Pipeline finished at' })
  @Prop()
  finishedAt?: Date;

  @ApiProperty({ description: 'Pipeline committed at' })
  @Prop()
  committedAt?: Date;

  @ApiProperty({ description: 'Pipeline duration in seconds' })
  @Prop()
  duration?: number;

  @ApiProperty({ description: 'Pipeline queued duration in seconds' })
  @Prop()
  queuedDuration?: number;

  @ApiProperty({ description: 'Coverage percentage' })
  @Prop()
  coverage?: string;

  @ApiProperty({ description: 'Pipeline web URL' })
  @Prop()
  webUrl?: string;

  @ApiProperty({ description: 'Detailed status' })
  @Prop({ type: Object })
  detailedStatus?: {
    icon: string;
    text: string;
    label: string;
    group: string;
    tooltip: string;
    hasDetails: boolean;
    detailsPath: string;
    illustration?: any;
    favicon: string;
  };

  @ApiProperty({ description: 'Pipeline jobs' })
  @Prop({ type: [Object], default: [] })
  jobs: Array<{
    id: number;
    name: string;
    status: string;
    stage: string;
    createdAt: Date;
    startedAt?: Date;
    finishedAt?: Date;
    duration?: number;
    queuedDuration?: number;
    user?: any;
    commit?: any;
    pipeline?: any;
    webUrl?: string;
    artifacts?: any[];
    runner?: any;
    artifactsExpireAt?: Date;
    tagList?: string[];
    allowFailure?: boolean;
    coverage?: string;
  }>;

  @ApiProperty({ description: 'Pipeline variables' })
  @Prop({ type: [Object], default: [] })
  variables: Array<{
    key: string;
    value: string;
    variableType: string;
    protected: boolean;
    masked: boolean;
    raw: boolean;
    environmentScope: string;
  }>;

  @ApiProperty({ description: 'Pipeline source', example: 'push' })
  @Prop()
  source?: string;

  @ApiProperty({ description: 'Pipeline name' })
  @Prop()
  name?: string;

  @ApiProperty({ description: 'Pipeline iid' })
  @Prop()
  iid?: number;

  @ApiProperty({ description: 'Tenant ID for multi-tenancy' })
  @Prop({ required: true })
  tenantId: string;

  @ApiProperty({ description: 'WebBuilder application ID' })
  @Prop()
  applicationId?: string;

  @ApiProperty({ description: 'WebBuilder repository ID' })
  @Prop()
  repositoryId?: string;

  @ApiProperty({ description: 'Triggered by user ID' })
  @Prop()
  triggeredBy?: string;

  @ApiProperty({ description: 'Pipeline type', example: 'build' })
  @Prop({ default: 'build' })
  pipelineType: string;

  @ApiProperty({ description: 'Build configuration' })
  @Prop({ type: Object })
  buildConfig?: {
    buildCommand?: string;
    outputDirectory?: string;
    nodeVersion?: string;
    environment?: Record<string, string>;
    artifacts?: string[];
    cache?: string[];
  };

  @ApiProperty({ description: 'Deployment configuration' })
  @Prop({ type: Object })
  deploymentConfig?: {
    environment: string;
    deploymentUrl?: string;
    deploymentStrategy?: string;
    rollbackEnabled?: boolean;
  };

  @ApiProperty({ description: 'Pipeline notifications' })
  @Prop({ type: Object, default: {} })
  notifications: {
    email?: boolean;
    slack?: boolean;
    webhook?: string;
  };

  @ApiProperty({ description: 'Pipeline status in WebBuilder', example: 'active' })
  @Prop({ default: 'active' })
  status_wb: string;

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

export const GitlabPipelineSchema = SchemaFactory.createForClass(GitlabPipeline);

// Create indexes for performance and tenant isolation
GitlabPipelineSchema.index({ tenantId: 1, gitlabPipelineId: 1 }, { unique: true });
GitlabPipelineSchema.index({ tenantId: 1, gitlabProjectId: 1 });
GitlabPipelineSchema.index({ tenantId: 1, status: 1 });
GitlabPipelineSchema.index({ tenantId: 1, ref: 1 });
GitlabPipelineSchema.index({ tenantId: 1, applicationId: 1 });
GitlabPipelineSchema.index({ tenantId: 1, repositoryId: 1 });
GitlabPipelineSchema.index({ tenantId: 1, pipelineType: 1 });
GitlabPipelineSchema.index({ tenantId: 1, syncStatus: 1 });
GitlabPipelineSchema.index({ tenantId: 1, createdAt: -1 });
