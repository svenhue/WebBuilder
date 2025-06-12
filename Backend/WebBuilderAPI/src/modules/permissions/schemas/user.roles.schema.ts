import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { AuditableSchema } from '@/shared/database/auditing';

export type UserRoleDocument = UserRole & Document;


@Schema({ timestamps: true })
export class UserRole extends AuditableSchema {

    @ApiProperty({ description: 'Permission Name' })
    @Prop({ required: true })
    userId: string;

    @ApiProperty({ description: 'Permission Name' })
    @Prop({ required: true })
    roleName: string;

    

    @ApiProperty({ description: 'Permission Name' })
    @Prop({ required: true })
    roleId: string;


}


export const UserRoleSchema = SchemaFactory.createForClass(UserRole);
