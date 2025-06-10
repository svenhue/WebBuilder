import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { IAuditable } from '../interfaces/auditable.interface';

/**
 * Base auditable schema class
 * Provides audit fields that can be extended by other schemas
 */
@Schema()
export abstract class AuditableSchema implements IAuditable {
  @ApiProperty({ 
    description: 'User ID who created this entity',
    type: String,
    required: true 
  })
  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  createdBy?: Types.ObjectId | string;

  @ApiProperty({ 
    description: 'User ID who last modified this entity',
    type: String,
    required: true 
  })
  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  lastchangedBy?: Types.ObjectId | string;

  @ApiProperty({ 
    description: 'Date when this entity was created',
    type: Date,
    required: true 
  })
  @Prop({ type: Date, default: Date.now })
  createdDate?: Date;

  @ApiProperty({ 
    description: 'Date when this entity was last modified',
    type: Date,
    required: true 
  })
  @Prop({ type: Date, default: Date.now })
  lastchangedDate?: Date;
}
