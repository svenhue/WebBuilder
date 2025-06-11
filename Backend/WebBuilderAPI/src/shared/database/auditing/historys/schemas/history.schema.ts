import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IHistoryEntry, OperationType } from '../interfaces/history.interface';

export type HistoryDocument = History & Document;

/**
 * Generic history schema for tracking all entity changes
 * This schema will be used to create collection-specific history collections
 */
@Schema({ 
  timestamps: false, // We use our own datetime field
  collection: 'histories' // Default collection name, will be overridden per entity type
})
export class History implements IHistoryEntry {
  @ApiProperty({ 
    description: 'Complete document state at the time of operation',
    type: Object 
  })
  @Prop({ type: Object, required: true })
  value: any;

  @ApiProperty({ 
    description: 'Type of operation performed',
    enum: OperationType,
    example: OperationType.UPDATE 
  })
  @Prop({ 
    type: String, 
    enum: Object.values(OperationType), 
    required: true 
  })
  operationType: OperationType;

  @ApiProperty({ 
    description: 'ID of the user who performed the operation',
    type: String 
  })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId | string;

  @ApiProperty({ 
    description: 'Date and time when the operation was performed',
    type: Date 
  })
  @Prop({ type: Date, default: Date.now, required: true })
  datetime: Date;

  @ApiProperty({ 
    description: 'ID of the original entity that was modified',
    type: String 
  })
  @Prop({ type: Types.ObjectId, required: true })
  entityId: Types.ObjectId | string;

  @ApiProperty({ 
    description: 'Type/name of the entity collection',
    type: String,
    example: 'applications' 
  })
  @Prop({ type: String, required: true })
  entityType: string;

  @ApiProperty({ 
    description: 'Specific changes made (for update operations)',
    type: Object,
    required: false 
  })
  @Prop({ type: Object, required: false })
  changes?: any;

  @ApiProperty({ 
    description: 'Additional metadata about the operation',
    type: Object,
    required: false 
  })
  @Prop({ type: Object, required: false })
  metadata?: {
    requestId?: string;
    userAgent?: string;
    ipAddress?: string;
    tenantId?: string;
  };
}

export const HistorySchema = SchemaFactory.createForClass(History);

// Create indexes for efficient querying
HistorySchema.index({ entityId: 1, datetime: -1 }); // Get history for specific entity, newest first
HistorySchema.index({ entityType: 1, datetime: -1 }); // Get history for entity type
HistorySchema.index({ userId: 1, datetime: -1 }); // Get history by user
HistorySchema.index({ operationType: 1, datetime: -1 }); // Get history by operation type
HistorySchema.index({ datetime: -1 }); // General datetime index for cleanup/archiving
HistorySchema.index({ entityType: 1, entityId: 1, datetime: -1 }); // Compound index for entity-specific queries

/**
 * Factory function to create a history schema for a specific entity type
 * @param entityType The name of the entity type (e.g., 'applications', 'users')
 * @returns Configured schema for the specific entity type
 */
export function createHistorySchema(entityType: string) {
  const schema = HistorySchema.clone();
  
  // Set the collection name to be entity-specific
  schema.set('collection', `${entityType}_history`);
  
  return schema;
}
