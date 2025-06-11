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

  @ApiProperty({ description: 'UITemplate description' })
  @Prop()
  type?: TemplateTypes;

}

export const TemplateSchema = SchemaFactory.createForClass(UITemplate);
