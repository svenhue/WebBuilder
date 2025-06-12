import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import { AuditableSchema } from '@/shared/database/auditing';

export type PermissionDocument = Permission & Document;


@Schema({ timestamps: true })
export class Permission extends AuditableSchema {

  @ApiProperty({ description: 'Permission Name' })
  @Prop({ required: true })
  name: string;

  @ApiPropertyOptional({ description: 'Permission Name' })
  @Prop({ required: true })
  parentName: string;

  @ApiProperty({ description: 'Permission Name' })
  @Prop({ required: true })
  displayName: string;

  @ApiProperty({ description: 'Permission Name' })
  @Prop({ required: true })
  isEnabled: boolean;

  @ApiProperty({ description: 'Permission Name' })
  @Prop({ required: true })
  groupName: string;
}


export const PermissionSchema = SchemaFactory.createForClass(Permission);
