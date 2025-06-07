import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type PageDocument = Page & Document;

@Schema({ timestamps: true })
export class Page {
  @ApiProperty({ description: 'Page ID', example: 1 })
  @Prop({ required: true })
  id: number;

  @ApiProperty({ description: 'Context ID', example: 1 })
  @Prop({ required: true })
  contextid: number;

  @ApiProperty({ description: 'Public identifier' })
  @Prop()
  publicidentifier?: string;

  @ApiProperty({ description: 'Is routable', example: true })
  @Prop({ default: false })
  isRoutable?: boolean;

  @ApiProperty({ description: 'Route definition' })
  @Prop({ type: Object, required: true })
  route: Record<string, any>;

  @ApiProperty({ description: 'Page type', example: 'page' })
  @Prop({ required: true })
  type: string;

  @ApiProperty({ description: 'Application name' })
  @Prop()
  appName?: string;

  @ApiProperty({ description: 'Template' })
  @Prop()
  template?: string;

  @ApiProperty({ description: 'Is root page', example: false })
  @Prop({ default: false })
  isRoot?: boolean;

  @ApiProperty({ description: 'Icon' })
  @Prop()
  icon?: string;

  @ApiProperty({ description: 'Image path' })
  @Prop()
  imagePath?: string;

  @ApiProperty({ description: 'HTML tag', example: 'div' })
  @Prop({ required: true })
  tag: string;

  @ApiProperty({ description: 'Page content' })
  @Prop({ type: Object })
  content?: Record<string, any>;

  @ApiProperty({ description: 'Authentication requirements' })
  @Prop({
    type: Object,
    default: { auth: false }
  })
  requiresAuth: {
    auth: boolean;
    redirect?: string;
  };

  @ApiProperty({ description: 'Page properties' })
  @Prop({
    type: Object,
    default: {
      imageSrc: '',
      iconName: '',
      showIf: ''
    }
  })
  properties: {
    imageSrc: string;
    iconName: string;
    showIf: string;
  };

  @ApiProperty({ description: 'Is active', example: true })
  @Prop({ default: true })
  isActive?: boolean;

  @ApiProperty({ description: 'Position in rendering', example: 1 })
  @Prop()
  position?: number;

  @ApiProperty({ description: 'Page interaction configuration' })
  @Prop({ type: Object })
  interaction?: Record<string, any>;

  @ApiProperty({ description: 'HTML attributes' })
  @Prop({ type: Object })
  htmlattributes?: Record<string, any>;

  @ApiProperty({ description: 'CSS classes', type: [String] })
  @Prop({ type: [String], default: [] })
  class: string[];

  @ApiProperty({ description: 'Inline styles' })
  @Prop({ type: Object })
  style?: Record<string, any>;

  @ApiProperty({ description: 'Page role' })
  @Prop()
  role?: string;

  @ApiProperty({ description: 'Parent page ID' })
  @Prop()
  parentId?: number;

  @ApiProperty({ description: 'Child pages', type: [Object] })
  @Prop({ type: [Object], default: [] })
  children?: Record<string, any>[];

  @ApiProperty({ description: 'Page values/configurations', type: [Object] })
  @Prop({ type: [Object], default: [] })
  value: Record<string, any>[];

  @ApiProperty({ description: 'Template identifier' })
  @Prop()
  templateIdentifier?: string;

  // IPageConfiguration specific fields
  @ApiProperty({ description: 'Page name', example: 'Home Page' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Page meta information' })
  @Prop({ type: Object, required: true })
  meta: Record<string, any>;

  @ApiProperty({ description: 'Page header configuration' })
  @Prop({ type: Object, required: true })
  head: Record<string, any>;

  @ApiProperty({ description: 'Views in this page', type: [Object] })
  @Prop({ type: [Object], default: [] })
  views: Record<string, any>[];

  @ApiProperty({ description: 'Page CSS', example: 'body { margin: 0; }' })
  @Prop({ required: true })
  css: string;

  // Additional fields for API management
  @ApiProperty({ description: 'Tenant ID for multi-tenancy' })
  @Prop({ required: true })
  tenantId: string;

  @ApiProperty({ description: 'Application ID this page belongs to' })
  @Prop()
  applicationId?: string;

  @ApiProperty({ description: 'Page description' })
  @Prop()
  description?: string;

  @ApiProperty({ description: 'Page tags', type: [String] })
  @Prop({ type: [String], default: [] })
  tags?: string[];

  @ApiProperty({ description: 'Page status', example: 'published' })
  @Prop({ default: 'draft' })
  status?: string;

  @ApiProperty({ description: 'Created by user ID' })
  @Prop()
  createdBy?: string;

  @ApiProperty({ description: 'Last modified by user ID' })
  @Prop()
  lastModifiedBy?: string;
}

export const PageSchema = SchemaFactory.createForClass(Page);

// Create indexes for tenant isolation and performance
PageSchema.index({ tenantId: 1, id: 1 }, { unique: true });
PageSchema.index({ tenantId: 1, name: 1 });
PageSchema.index({ tenantId: 1, applicationId: 1 });
PageSchema.index({ tenantId: 1, status: 1 });
PageSchema.index({ tenantId: 1, isActive: 1 });
PageSchema.index({ tenantId: 1, parentId: 1 });
PageSchema.index({ tenantId: 1, tags: 1 });
