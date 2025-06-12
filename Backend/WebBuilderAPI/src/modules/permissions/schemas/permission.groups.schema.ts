import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { AuditableSchema } from '@/shared/database/auditing';

export type PermissionGrantDocument = PermissionGroup & Document;


@Schema({ timestamps: true })
export class PermissionGroup extends AuditableSchema {

    @ApiProperty({ description: 'Permission Name' })
    @Prop({ required: true })
    name: string;

    @ApiProperty({ description: 'Permission Name' })
    @Prop({ required: true })
    displayName: string;

}


export const PermissionGroupSchema = SchemaFactory.createForClass(PermissionGroup);
