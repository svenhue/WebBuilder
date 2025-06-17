import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { AuditableSchema } from '@/shared/database/auditing';

export type PermissionGrantDocument = Role & Document;


@Schema({ timestamps: true })
export class Role extends AuditableSchema {

    @ApiProperty({ description: 'Permission Name' })
    @Prop({ required: true })
    name: string;

    @ApiProperty({ description: 'Permission Name' })
    @Prop({ required: true })
    displayName: string;

    @ApiProperty({ description: 'Permission Name' })
    @Prop({ required: true })
    normalizedName: string;

    @ApiProperty({ description: 'Permission Name' })
    @Prop({ required: true })
    isDefault: boolean;

    @ApiProperty({ description: 'Permission Name' })
    @Prop({ required: true })
    isPublic: boolean;

}


export const RoleSchema = SchemaFactory.createForClass(Role);
