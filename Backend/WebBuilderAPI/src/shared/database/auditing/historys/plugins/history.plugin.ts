import { Schema, Document } from 'mongoose';
import { OperationType } from '../interfaces/history.interface';

/**
 * Global history service instance
 * This will be set by the HistoryModule
 */
let globalHistoryService: any = null;

/**
 * Sets the global history service
 * @param service The history service instance
 */
export function setGlobalHistoryService(service: any): void {
  globalHistoryService = service;
}

/**
 * Gets the current history service
 * @returns The history service instance
 */
function getHistoryService(): any {
  return globalHistoryService;
}

/**
 * Mongoose plugin for automatic history tracking
 * Creates history entries for all database operations
 * @param schema The Mongoose schema to enhance
 * @param options Optional configuration for history tracking
 */
export function historyPlugin(schema: Schema, options: any = {}): void {
  const config = {
    enabled: true,
    trackCreates: true,
    trackUpdates: true,
    trackDeletes: true,
    ...options
  };

  // Skip if history tracking is disabled
  if (!config.enabled) {
    return;
  }

  // Get collection name from schema options or use default
  const getCollectionName = (doc: any) => {
    return doc.constructor.collection?.collectionName || 
           doc.collection?.collectionName || 
           'unknown';
  };

  // Post-save hook for create operations
  schema.post('save', async function(doc: Document) {
    if (!config.trackCreates) return;
    
    const historyService = getHistoryService();
    if (!historyService) return;

    try {
      const collectionName = getCollectionName(doc);
      const isNew = doc.isNew === undefined ? true : doc.isNew;
      
      if (isNew) {
        await historyService.createHistoryEntry(
          collectionName,
          doc._id,
          OperationType.CREATE,
          doc.toObject()
        );
      }
    } catch (error) {
      console.error('Failed to create history entry for save operation:', error);
    }
  });

  // Pre-update hooks to capture the original document
  const updateHooks = ['updateOne', 'findOneAndUpdate', 'updateMany', 'replaceOne'];
  
  updateHooks.forEach(method => {
    schema.pre(method as any, async function(this: any) {
      if (!config.trackUpdates) return;
      
      const historyService = getHistoryService();
      if (!historyService) return;

      try {
        // Store the original document for comparison
        const filter = this.getFilter();
        const Model = this.model;
        
        if (filter._id) {
          const originalDoc = await Model.findById(filter._id).lean();
          if (originalDoc) {
            this._originalDoc = originalDoc;
          }
        }
      } catch (error) {
        console.error('Failed to capture original document for update:', error);
      }
    });

    schema.post(method as any, async function(this: any, result: any) {
      if (!config.trackUpdates) return;
      
      const historyService = getHistoryService();
      if (!historyService || !this._originalDoc) return;

      try {
        const filter = this.getFilter();
        const update = this.getUpdate();
        const Model = this.model;
        
        if (filter._id) {
          // Get the updated document
          const updatedDoc = await Model.findById(filter._id).lean();
          if (updatedDoc) {
            const collectionName = Model.collection.collectionName;
            
            // Calculate changes
            const changes = calculateChanges(this._originalDoc, updatedDoc);
            
            await historyService.createHistoryEntry(
              collectionName,
              filter._id,
              OperationType.UPDATE,
              updatedDoc,
              undefined, // userId will be retrieved from CLS
              changes
            );
          }
        }
      } catch (error) {
        console.error('Failed to create history entry for update operation:', error);
      }
    });
  });

  // Pre-delete hooks to capture the document before deletion
  const deleteHooks = ['deleteOne', 'findOneAndDelete', 'deleteMany'];
  
  deleteHooks.forEach(method => {
    schema.pre(method as any, async function(this: any) {
      if (!config.trackDeletes) return;
      
      const historyService = getHistoryService();
      if (!historyService) return;

      try {
        const filter = this.getFilter();
        const Model = this.model;
        
        if (method === 'deleteMany') {
          // For deleteMany, capture all documents that will be deleted
          const docsToDelete = await Model.find(filter).lean();
          this._docsToDelete = docsToDelete;
        } else if (filter._id) {
          // For single document deletion
          const docToDelete = await Model.findById(filter._id).lean();
          if (docToDelete) {
            this._docToDelete = docToDelete;
          }
        }
      } catch (error) {
        console.error('Failed to capture document for deletion:', error);
      }
    });

    schema.post(method as any, async function(this: any, result: any) {
      if (!config.trackDeletes) return;
      
      const historyService = getHistoryService();
      if (!historyService) return;

      try {
        const Model = this.model;
        const collectionName = Model.collection.collectionName;

        if (method === 'deleteMany' && this._docsToDelete) {
          // Create history entries for all deleted documents
          for (const doc of this._docsToDelete) {
            await historyService.createHistoryEntry(
              collectionName,
              doc._id,
              OperationType.DELETE,
              doc
            );
          }
        } else if (this._docToDelete) {
          // Create history entry for single deleted document
          await historyService.createHistoryEntry(
            collectionName,
            this._docToDelete._id,
            OperationType.DELETE,
            this._docToDelete
          );
        }
      } catch (error) {
        console.error('Failed to create history entry for delete operation:', error);
      }
    });
  });

  // Handle document.deleteOne() method (replaces deprecated remove())
  schema.pre('deleteOne', { document: true, query: false }, async function(this: Document) {
    if (!config.trackDeletes) return;
    
    const historyService = getHistoryService();
    if (!historyService) return;

    try {
      const collectionName = getCollectionName(this);
      
      await historyService.createHistoryEntry(
        collectionName,
        this._id,
        OperationType.DELETE,
        this.toObject()
      );
    } catch (error) {
      console.error('Failed to create history entry for deleteOne operation:', error);
    }
  });
}

/**
 * Calculates the differences between two documents
 * @param original The original document
 * @param updated The updated document
 * @returns Object containing the changes
 */
function calculateChanges(original: any, updated: any): any {
  const changes: any = {};
  
  // Simple change detection - compare top-level fields
  for (const key in updated) {
    if (key === '_id' || key === '__v') continue;
    
    if (JSON.stringify(original[key]) !== JSON.stringify(updated[key])) {
      changes[key] = {
        from: original[key],
        to: updated[key]
      };
    }
  }
  
  // Check for removed fields
  for (const key in original) {
    if (key === '_id' || key === '__v') continue;
    
    if (!(key in updated)) {
      changes[key] = {
        from: original[key],
        to: undefined
      };
    }
  }
  
  return changes;
}

/**
 * Factory function to create history plugin with specific configuration
 * @param config History configuration
 * @returns Configured history plugin function
 */
export function createHistoryPlugin(config: any = {}) {
  return function (schema: Schema) {
    historyPlugin(schema, config);
  };
}
