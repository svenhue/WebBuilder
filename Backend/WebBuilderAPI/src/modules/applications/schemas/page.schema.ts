// page-configuration.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ViewConfiguration, ViewConfigurationSchema } from './view.schema';

@Schema({ _id: false })
class PageMeta {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop([String])
  keywords: string[];
}

@Schema({ _id: false })
class PageHeader {
  @Prop([String])
  scripts: string[];
}

@Schema({_id: false})
export class PageConfiguration {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  role: string;

  @Prop({ type: PageMeta })
  meta: PageMeta;

  @Prop({ type: PageHeader })
  head: PageHeader;

  @Prop({ type: [ViewConfigurationSchema], default: [] })
  views: ViewConfiguration[];

  @Prop()
  css: string;
}

export const PageConfigurationSchema = SchemaFactory.createForClass(PageConfiguration);
