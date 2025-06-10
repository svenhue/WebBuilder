import { Types } from 'mongoose';

/**
 * Interface for auditable entities
 * Defines the contract for entities that support auditing
 */
export interface IAuditable {
  createdBy?: Types.ObjectId | string;
  lastchangedBy?: Types.ObjectId | string;
  createdDate?: Date;
  lastchangedDate?: Date;
}

/**
 * Interface for audit context providers
 * Allows for extensible audit context retrieval
 */
export interface IAuditContextProvider {
  getCurrentUserId(): Types.ObjectId | string | null;
  getAdditionalContext?(): Record<string, any>;
}

/**
 * Configuration interface for auditing behavior
 */
export interface IAuditConfig {
  enableCreatedBy?: boolean;
  enableLastchangedBy?: boolean;
  enableCreatedDate?: boolean;
  enableLastchangedDate?: boolean;
  contextProvider?: IAuditContextProvider;
}
