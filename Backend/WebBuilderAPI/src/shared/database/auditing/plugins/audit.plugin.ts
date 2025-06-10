import { Schema, Document } from 'mongoose';
import { IAuditContextProvider, IAuditConfig } from '../interfaces/auditable.interface';

/**
 * Default audit configuration
 */
const DEFAULT_AUDIT_CONFIG: Required<IAuditConfig> = {
  enableCreatedBy: true,
  enableLastchangedBy: true,
  enableCreatedDate: true,
  enableLastchangedDate: true,
  contextProvider: null as any, // Will be injected
};

/**
 * Global audit context provider instance
 * This will be set by the AuditingModule
 */
let globalAuditContextProvider: IAuditContextProvider | null = null;

/**
 * Sets the global audit context provider
 * @param provider The audit context provider instance
 */
export function setGlobalAuditContextProvider(provider: IAuditContextProvider): void {
  globalAuditContextProvider = provider;
}

/**
 * Gets the current audit context provider
 * @param config Optional configuration with custom provider
 * @returns The audit context provider
 */
function getAuditContextProvider(config?: IAuditConfig): IAuditContextProvider | null {
  return config?.contextProvider || globalAuditContextProvider;
}

/**
 * Mongoose plugin for automatic auditing
 * Adds audit fields and hooks to schemas
 * @param schema The Mongoose schema to enhance
 * @param options Optional configuration for auditing behavior
 */
export function auditPlugin(schema: Schema, options: IAuditConfig = {}): void {
  const config = { ...DEFAULT_AUDIT_CONFIG, ...options };

  // Add audit fields to schema if they don't exist
  if (config.enableCreatedBy && !schema.paths.createdBy) {
    schema.add({
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    });
  }

  if (config.enableLastchangedBy && !schema.paths.lastchangedBy) {
    schema.add({
      lastchangedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    });
  }

  if (config.enableCreatedDate && !schema.paths.createdDate) {
    schema.add({
      createdDate: {
        type: Date
      },
    });
  }

  if (config.enableLastchangedDate && !schema.paths.lastchangedDate) {
    schema.add({
      lastchangedDate: {
        type: Date,
        default: Date.now,
      },
    });
  }

  // Pre-save hook for new documents
  schema.pre('save', function (next) {
    const contextProvider = getAuditContextProvider(config);
    
    if (!contextProvider) {
      return next();
    }

    const currentUserId = contextProvider.getCurrentUserId();
    const now = new Date();

    // Set audit fields for new documents
    if (this.isNew) {
      if (config.enableCreatedBy && currentUserId) {
        this.createdBy = currentUserId;
      }
      if (config.enableCreatedDate) {
        this.createdDate = now;
      }
    }

    // Always update lastchanged fields for any save operation
    if (config.enableLastchangedBy && currentUserId) {
      this.lastchangedBy = currentUserId;
    }
    if (config.enableLastchangedDate) {
      this.lastchangedDate = now;
    }

    next();
  });

  // Pre-update hooks for update operations
  const updateHook = function (this: any, next: Function) {
    const contextProvider = getAuditContextProvider(config);
    
    if (!contextProvider) {
      return next();
    }

    const currentUserId = contextProvider.getCurrentUserId();
    const now = new Date();
    const update: any = {};

    if (config.enableLastchangedBy && currentUserId) {
      update.lastchangedBy = currentUserId;
    }
    if (config.enableLastchangedDate) {
      update.lastchangedDate = now;
    }

    // Apply the update
    this.set(update);
    next();
  };

  // Apply update hook to various update methods
  schema.pre('updateOne', updateHook);
  schema.pre('findOneAndUpdate', updateHook);
  schema.pre('updateMany', updateHook);
  schema.pre('replaceOne', updateHook);

  // Add indexes for audit fields to improve query performance
  if (config.enableCreatedBy) {
    schema.index({ createdBy: 1 });
  }
  if (config.enableLastchangedBy) {
    schema.index({ lastchangedBy: 1 });
  }
  if (config.enableCreatedDate) {
    schema.index({ createdDate: 1 });
  }
  if (config.enableLastchangedDate) {
    schema.index({ lastchangedDate: 1 });
  }
}

/**
 * Factory function to create audit plugin with specific configuration
 * @param config Audit configuration
 * @returns Configured audit plugin function
 */
export function createAuditPlugin(config: IAuditConfig = {}) {
  return function (schema: Schema) {
    auditPlugin(schema, config);
  };
}
