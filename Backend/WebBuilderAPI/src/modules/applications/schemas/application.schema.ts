import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ApplicationDocument = Application & Document;

@Schema({ timestamps: true })
export class Application {
  @ApiProperty({ description: 'Application ID', example: 1 })
  @Prop({ required: true })
  id: number;

  @ApiProperty({ description: 'Application name', example: 'My WebBuilder App' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Root component configuration', required: false })
  @Prop({ type: Object })
  rootComponent?: Record<string, any>;

  @ApiProperty({ description: 'Application mode', example: 'development' })
  @Prop()
  mode?: string;

  @ApiProperty({ description: 'Application modules', type: [Object] })
  @Prop({ type: [Object], default: [] })
  modules?: Record<string, any>[];

  @ApiProperty({ description: 'Is production environment', example: false })
  @Prop({ required: true, default: false })
  isProduction: boolean;

  @ApiProperty({ description: 'Deployment mode', example: 'spa' })
  @Prop({ required: true })
  deploymentMode: string;

  @ApiProperty({ description: 'Page configurations', type: [Object] })
  @Prop({ type: [Object], default: [] })
  pages?: Record<string, any>[];

  @ApiProperty({ description: 'Application stylesheets configuration' })
  @Prop({ type: Object })
  stylesheets?: Record<string, any>;

  @ApiProperty({ description: 'Global application variables' })
  @Prop({ type: Object, default: {} })
  globalVariables?: Record<string, any>;

  @ApiProperty({ description: 'Network configurations', type: [Object] })
  @Prop({ type: [Object], default: [] })
  networkConfigs?: Record<string, any>[];

  @ApiProperty({ description: 'Authentication configuration' })
  @Prop({ type: Object })
  authentication?: Record<string, any>;

  @ApiProperty({ description: 'Internationalization configuration' })
  @Prop({ type: Object, required: true })
  internationalization: Record<string, any>;

  @ApiProperty({ description: 'Server-side rendering enabled', example: false })
  @Prop({ required: true, default: false })
  ssr: boolean;

  @ApiProperty({ description: 'Application queries/tasks', type: [Object] })
  @Prop({ type: [Object], default: [] })
  querys?: Record<string, any>[];

  @ApiProperty({ description: 'Application version', example: '1.0.0' })
  @Prop({ required: true })
  version: string;

  @ApiProperty({ description: 'Version control provider', example: 'git' })
  @Prop({ required: true })
  versionControlProvider: string;

  @ApiProperty({ description: 'Version control token' })
  @Prop({ required: true })
  versionControlToken: string;

  @ApiProperty({ description: 'Repository URL', example: 'https://github.com/user/repo.git' })
  @Prop({ required: true })
  repositoryUrl: string;

  @ApiProperty({ description: 'Tenant ID for multi-tenancy' })
  @Prop({ required: true })
  tenantId: string;

  @ApiProperty({ description: 'Application description' })
  @Prop()
  description?: string;

  @ApiProperty({ description: 'Application tags', type: [String] })
  @Prop({ type: [String], default: [] })
  tags?: string[];

  @ApiProperty({ description: 'Application status', example: 'active' })
  @Prop({ default: 'active' })
  status?: string;

  @ApiProperty({ description: 'Created by user ID' })
  @Prop()
  createdBy?: string;

  @ApiProperty({ description: 'Last modified by user ID' })
  @Prop()
  lastModifiedBy?: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);

// Create indexes for tenant isolation and performance
ApplicationSchema.index({ tenantId: 1, id: 1 }, { unique: true });
ApplicationSchema.index({ tenantId: 1, name: 1 });
ApplicationSchema.index({ tenantId: 1, status: 1 });
ApplicationSchema.index({ tenantId: 1, createdBy: 1 });
ApplicationSchema.index({ tenantId: 1, tags: 1 });
