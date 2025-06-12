import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IPageConfiguration } from 'webbuilderalphautils';
import { TemplateTypes } from '../enums/TemplateTypes';
import { AuditableSchema } from '@/shared/database/auditing';
export type UITemplateDocument = UITemplate & Document;

@Schema({ timestamps: true })
export class UITemplate extends AuditableSchema{

  @ApiProperty({ description: 'UITemplate name', example: 'My WebBuilder UITemplate' })
  @Prop({ required: false })
  name: string;

  @ApiProperty({ description: 'Deployment mode', example: 'spa' })
  @Prop({ required: false })
  deploymentMode?: string;

  @ApiProperty({ description: 'Categorys'})
  @Prop({ required: false })
  categorys?: Array<string>;

  @ApiProperty({ description: 'Page configurations', type: [Object] })
  @Prop({ type: [Object], default: [] })
  pages?: Array<IPageConfiguration>;

  @ApiProperty({ description: 'UITemplate stylesheets configuration' })
  @Prop({ type: Object })
  stylesheets?: Record<string, any>;

  @ApiProperty({ description: 'Internationalization configuration' })
  @Prop({ type: Object, required: false })
  internationalization?: Record<string, any>;

  @ApiProperty({ description: 'UITemplate queries/tasks', type: [Object] })
  @Prop({ type: [Object], default: [] })
  querys?: Record<string, any>[];

  @ApiProperty({ description: 'UITemplate version', example: '1.0.0' })
  @Prop({ required: false })
  version: string;

  @ApiProperty({ description: 'UITemplate description' })
  @Prop()
  description?: string;

  @ApiProperty({ description: 'UITemplate type' })
  @Prop({required: true})
  type?: string;

  @ApiProperty({ description: 'Template price in USD', example: 49.99 })
  @Prop({ required: false, default: 0 })
  price?: number;

  @ApiProperty({ description: 'Is template free', example: true })
  @Prop({ required: false, default: true })
  isFree?: boolean;

  @ApiProperty({ description: 'Is template publicly available', example: true })
  @Prop({ required: false, default: false })
  isPublic?: boolean;

  @ApiProperty({ description: 'Template thumbnail image URL' })
  @Prop({ required: false })
  thumbnail?: string;

  @ApiProperty({ description: 'Template preview images', type: [String] })
  @Prop({ type: [String], default: [] })
  previewImages?: string[];

  @ApiProperty({ description: 'Template author/creator ID' })
  @Prop({ required: false })
  authorId?: string;

  @ApiProperty({ description: 'Template download count', example: 1247 })
  @Prop({ required: false, default: 0 })
  downloads?: number;

  @ApiProperty({ description: 'Template rating (1-5)', example: 4.8 })
  @Prop({ required: false, default: 0 })
  rating?: number;

  @ApiProperty({ description: 'Number of reviews', example: 89 })
  @Prop({ required: false, default: 0 })
  reviewCount?: number;

  @ApiProperty({ description: 'Template tags for search', type: [String] })
  @Prop({ type: [String], default: [] })
  tags?: string[];

  @ApiProperty({ description: 'Template featured status', example: false })
  @Prop({ required: false, default: false })
  isFeatured?: boolean;

  @ApiProperty({ description: 'Template approval status', example: 'approved' })
  @Prop({ required: false, default: 'pending' })
  approvalStatus?: string;

}

export const TemplateSchema = SchemaFactory.createForClass(UITemplate);
