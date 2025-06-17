import { Types } from 'mongoose';

/**
 * Enum for operation types in history tracking
 */
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete'
}

/**
 * Interface for history entries
 */
export interface IHistoryEntry {
  value: any; // The complete document state at this moment
  operationType: OperationType;
  userId: Types.ObjectId | string;
  datetime: Date;
  entityId: Types.ObjectId | string; // Reference to the original document
  entityType: string; // Collection name
  changes?: any; // Optional: specific changes made (for updates)
}

/**
 * Interface for history service configuration
 */
export interface IHistoryConfig {
  enabled?: boolean;
  trackDeletes?: boolean;
  trackUpdates?: boolean;
  trackCreates?: boolean;
  maxHistoryEntries?: number; // Optional: limit history entries per entity
  excludeFields?: string[]; // Fields to exclude from history tracking
}

/**
 * Interface for history service
 */
export interface IHistoryService {
  createHistoryEntry(
    entityType: string,
    entityId: string | Types.ObjectId,
    operationType: OperationType,
    value: any,
    userId?: string | Types.ObjectId,
    changes?: any
  ): Promise<void>;

  getHistory(
    entityType: string,
    entityId: string | Types.ObjectId,
    limit?: number
  ): Promise<IHistoryEntry[]>;

  getHistoryByUser(
    userId: string | Types.ObjectId,
    limit?: number
  ): Promise<IHistoryEntry[]>;
}
