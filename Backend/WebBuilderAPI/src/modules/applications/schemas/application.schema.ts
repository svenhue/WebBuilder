import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IPageConfiguration } from 'webbuilderalphautils';
import { AuditableSchema } from '../../../shared/database/auditing/schemas/auditable.schema';

export type ApplicationDocument = Application & Document;

@Schema({ timestamps: true })
export class Application extends AuditableSchema {

  @ApiProperty({ description: 'Application name', example: 'My WebBuilder App' })
  @Prop({ required: false })
  name: string;

  @ApiProperty({ description: 'Application modules', type: [Object] })
  @Prop({ type: [Object], default: [] })
  modules?: Record<string, any>[];

  @ApiProperty({ description: 'Deployment mode', example: 'spa' })
  @Prop({ required: false })
  deploymentMode: string;

  @ApiProperty({ description: 'Page configurations', type: [Object] })
  @Prop({ type: [Object], default: [] })
  pages?: Array<IPageConfiguration>;

  @ApiProperty({ description: 'Application stylesheets configuration' })
  @Prop({ type: Object })
  stylesheets?: Record<string, any>;

  @ApiProperty({ description: 'Global application variables' })
  @Prop({ type: Object, default: {} })
  globalVariables?: string;

  @ApiProperty({ description: 'Network configurations', type: [Object] })
  @Prop({ type: [Object], default: [] })
  networkConfigs?: Record<string, any>[];

  @ApiProperty({ description: 'Authentication configuration' })
  @Prop({ type: Object })
  authentication?: Record<string, any>;

  @ApiProperty({ description: 'Internationalization configuration' })
  @Prop({ type: Object, required: false })
  internationalization?: Record<string, any>;

  @ApiProperty({ description: 'Application queries/tasks', type: [Object] })
  @Prop({ type: [Object], default: [] })
  querys?: Record<string, any>[];

  @ApiProperty({ description: 'Application version', example: '1.0.0' })
  @Prop({ required: false })
  version: string;


  @ApiProperty({ description: 'Tenant ID for multi-tenancy' })
  @Prop({ required: false })
  tenantId?: string;

  @ApiProperty({ description: 'Application description' })
  @Prop()
  description?: string;

  @ApiProperty({ description: 'Application tags', type: [String] })
  @Prop({ type: [String], default: [] })
  tags?: string[];

  @ApiProperty({ description: 'Application status', example: 'active' })
  @Prop({ default: 'active' })
  status?: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);

// Create indexes for tenant isolation and performance
ApplicationSchema.index({ tenantId: 1, id: 1 }, { unique: false });
ApplicationSchema.index({ tenantId: 1, name: 1 });
ApplicationSchema.index({ tenantId: 1, status: 1 });
ApplicationSchema.index({ tenantId: 1, createdBy: 1 });
ApplicationSchema.index({ tenantId: 1, tags: 1 });
