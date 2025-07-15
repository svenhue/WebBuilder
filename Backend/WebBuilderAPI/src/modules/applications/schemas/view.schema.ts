// view-configuration.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';


@Schema({ _id: false })
class RequiresAuth {
  @Prop({ required: true })
  auth: boolean;

  @Prop()
  redirect?: string;
}

@Schema({ _id: false })
class Properties {
  @Prop()
  imageSrc: string;

  @Prop()
  iconName: string;

  @Prop()
  showIf: string;
}

@Schema({id: false})
export class ViewConfiguration extends Document {
  @Prop({ required: true })
  id: number;

  @Prop({ required: false })
  contextid: number;

  @Prop()
  publicidentifier?: string;

  @Prop()
  isRoutable?: boolean;

  @Prop({ type: Object }) // You may want to further type this
  route: Object;

  @Prop({ required: true })
  type: string;

  @Prop()
  appName?: string;

  @Prop()
  template?: string;

  @Prop()
  isRoot?: boolean;

  @Prop()
  icon?: string;

  @Prop()
  imagePath?: string;

  @Prop({ required: true })
  tag: string;

  @Prop({ type: Object })
  content?: object;

  @Prop({ type: RequiresAuth })
  requiresAuth: RequiresAuth;

  @Prop({ type: Properties })
  properties: Properties;

  @Prop()
  isActive?: boolean;

  @Prop()
  position?: number;

  @Prop({ type: Object })
  interaction?: Object;

  @Prop({ type: Object })
  htmlattributes?: object;

  @Prop({ type: [String] })
  class: string[];

  @Prop({ type: Object })
  style?: object;

  @Prop({ type: Array<string> })
  role?: Array<string>; // Assuming ViewRoles is an array of strings

  @Prop()
  parentId?: number;

  @Prop({ type: [MongooseSchema.Types.Mixed] }) // recursive nesting
  children?: any[];

  @Prop({ type: [MongooseSchema.Types.Mixed] }) // possibly same as children
  value: any[];

  @Prop()
  templateIdentifier?: string;
}

export const ViewConfigurationSchema = SchemaFactory.createForClass(ViewConfiguration);
