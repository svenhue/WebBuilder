import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IPageConfiguration } from 'webbuilderalphautils';
export type UITemplateDocument = Module & Document;

@Schema({ timestamps: true })
export class Module {


}

export const ApplicationSchema = SchemaFactory.createForClass(Module);
