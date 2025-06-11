import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
import { ClsService } from 'nestjs-cls';
import { 
  IHistoryService, 
  IHistoryEntry, 
  OperationType, 
  IHistoryConfig 
} from '../interfaces/history.interface';
import { History, HistoryDocument, createHistorySchema } from '../schemas/history.schema';

/**
 * Service for managing entity history tracking
 * Creates and manages history collections for each entity type
 */
@Injectable()
export class HistoryService implements IHistoryService {
  private readonly logger = new Logger(HistoryService.name);
  private readonly historyModels = new Map<string, Model<HistoryDocument>>();
  private readonly defaultConfig: Required<IHistoryConfig> = {
    enabled: true,
    trackDeletes: true,
    trackUpdates: true,
    trackCreates: true,
    maxHistoryEntries: 1000, // Default limit per entity
    excludeFields: ['__v', 'updatedAt'] // Default excluded fields
  };

  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly clsService: ClsService
  ) {}

  /**
   * Gets or creates a history model for the specified entity type
   * @param entityType The entity type (collection name)
   * @returns Mongoose model for the entity's history collection
   */
  private getHistoryModel(entityType: string): Model<HistoryDocument> {
    if (!this.historyModels.has(entityType)) {
      const collectionName = `${entityType}_history`;
      const schema = createHistorySchema(entityType);
      
      // Check if model already exists to avoid OverwriteModelError
      let model: Model<HistoryDocument>;
      try {
        model = this.connection.model<HistoryDocument>(collectionName);
      } catch (error) {
        model = this.connection.model<HistoryDocument>(collectionName, schema);
      }
      
      this.historyModels.set(entityType, model);
      this.logger.log(`Created history model for entity type: ${entityType}`);
    }
    
    return this.historyModels.get(entityType)!;
  }

  /**
   * Creates a history entry for an entity operation
   * @param entityType The type of entity (collection name)
   * @param entityId The ID of the entity
   * @param operationType The type of operation performed
   * @param value The complete document state
   * @param userId The ID of the user who performed the operation
   * @param changes Optional specific changes made (for updates)
   */
  async createHistoryEntry(
    entityType: string,
    entityId: string | Types.ObjectId,
    operationType: OperationType,
    value: any,
    userId?: string | Types.ObjectId,
    changes?: any
  ): Promise<void> {
    try {
      const HistoryModel = this.getHistoryModel(entityType);
      
      // Get additional context from CLS if available
      const metadata = this.getRequestMetadata();
      
      // Clean the value object (remove excluded fields)
      const cleanedValue = this.cleanValue(value);
      
      const historyEntry = new HistoryModel({
        value: cleanedValue,
        operationType,
        userId: userId || this.getCurrentUserId(),
        datetime: new Date(),
        entityId: new Types.ObjectId(entityId.toString()),
        entityType,
        changes,
        metadata
      });

      await historyEntry.save();
      
      // Optionally cleanup old entries if max limit is reached
      await this.cleanupOldEntries(entityType, entityId);
      
      this.logger.debug(
        `Created history entry for ${entityType}:${entityId} - ${operationType}`
      );
    } catch (error) {
      this.logger.error(
        `Failed to create history entry for ${entityType}:${entityId}`,
        error
      );
      // Don't throw error to avoid breaking the main operation
    }
  }

  /**
   * Retrieves history for a specific entity
   * @param entityType The type of entity
   * @param entityId The ID of the entity
   * @param limit Maximum number of entries to return
   * @returns Array of history entries
   */
  async getHistory(
    entityType: string,
    entityId: string | Types.ObjectId,
    limit: number = 50
  ): Promise<IHistoryEntry[]> {
    try {
      const HistoryModel = this.getHistoryModel(entityType);
      
      const history = await HistoryModel
        .find({ 
          entityType, 
          entityId: new Types.ObjectId(entityId.toString()) 
        })
        .sort({ datetime: -1 })
        .limit(limit)
        .populate('userId', 'email firstName lastName')
        .lean()
        .exec();

      return history as IHistoryEntry[];
    } catch (error) {
      this.logger.error(
        `Failed to retrieve history for ${entityType}:${entityId}`,
        error
      );
      return [];
    }
  }

  /**
   * Retrieves history entries by user
   * @param userId The ID of the user
   * @param limit Maximum number of entries to return
   * @returns Array of history entries
   */
  async getHistoryByUser(
    userId: string | Types.ObjectId,
    limit: number = 100
  ): Promise<IHistoryEntry[]> {
    try {
      // We need to query across all history collections
      // For now, we'll query the main histories collection
      // In a production environment, you might want to maintain a unified history view
      const allHistories: IHistoryEntry[] = [];
      
      for (const [entityType, model] of this.historyModels) {
        const history = await model
          .find({ userId: new Types.ObjectId(userId.toString()) })
          .sort({ datetime: -1 })
          .limit(Math.ceil(limit / this.historyModels.size))
          .populate('userId', 'email firstName lastName')
          .lean()
          .exec();
        
        allHistories.push(...(history as IHistoryEntry[]));
      }
      
      // Sort all entries by datetime and limit
      return allHistories
        .sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime())
        .slice(0, limit);
    } catch (error) {
      this.logger.error(`Failed to retrieve history for user ${userId}`, error);
      return [];
    }
  }

  /**
   * Gets history entries by operation type
   * @param operationType The type of operation
   * @param entityType Optional entity type filter
   * @param limit Maximum number of entries to return
   * @returns Array of history entries
   */
  async getHistoryByOperation(
    operationType: OperationType,
    entityType?: string,
    limit: number = 100
  ): Promise<IHistoryEntry[]> {
    try {
      if (entityType) {
        const HistoryModel = this.getHistoryModel(entityType);
        const history = await HistoryModel
          .find({ operationType })
          .sort({ datetime: -1 })
          .limit(limit)
          .populate('userId', 'email firstName lastName')
          .lean()
          .exec();
        
        return history as IHistoryEntry[];
      } else {
        // Query across all entity types
        const allHistories: IHistoryEntry[] = [];
        
        for (const [type, model] of this.historyModels) {
          const history = await model
            .find({ operationType })
            .sort({ datetime: -1 })
            .limit(Math.ceil(limit / this.historyModels.size))
            .populate('userId', 'email firstName lastName')
            .lean()
            .exec();
          
          allHistories.push(...(history as IHistoryEntry[]));
        }
        
        return allHistories
          .sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime())
          .slice(0, limit);
      }
    } catch (error) {
      this.logger.error(
        `Failed to retrieve history for operation ${operationType}`,
        error
      );
      return [];
    }
  }

  /**
   * Gets the current user ID from CLS
   * @returns Current user ID or null
   */
  private getCurrentUserId(): Types.ObjectId | string | null {
    try {
      const user = this.clsService.get('user');
      return user?.id || user?._id || null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Gets request metadata from CLS
   * @returns Request metadata object
   */
  private getRequestMetadata(): any {
    try {
      return {
        requestId: this.clsService.get('requestId'),
        userAgent: this.clsService.get('userAgent'),
        ipAddress: this.clsService.get('ipAddress'),
        tenantId: this.clsService.get('tenantId')
      };
    } catch (error) {
      return {};
    }
  }

  /**
   * Cleans the value object by removing excluded fields
   * @param value The value to clean
   * @returns Cleaned value object
   */
  private cleanValue(value: any): any {
    if (!value || typeof value !== 'object') {
      return value;
    }

    const cleaned = { ...value };
    
    // Remove excluded fields
    this.defaultConfig.excludeFields.forEach(field => {
      delete cleaned[field];
    });

    return cleaned;
  }

  /**
   * Cleans up old history entries if the limit is exceeded
   * @param entityType The entity type
   * @param entityId The entity ID
   */
  private async cleanupOldEntries(
    entityType: string,
    entityId: string | Types.ObjectId
  ): Promise<void> {
    try {
      const HistoryModel = this.getHistoryModel(entityType);
      
      const count = await HistoryModel.countDocuments({
        entityType,
        entityId: new Types.ObjectId(entityId.toString())
      });

      if (count > this.defaultConfig.maxHistoryEntries) {
        const entriesToDelete = count - this.defaultConfig.maxHistoryEntries;
        
        // Get the oldest entries to delete
        const oldEntries = await HistoryModel
          .find({
            entityType,
            entityId: new Types.ObjectId(entityId.toString())
          })
          .sort({ datetime: 1 })
          .limit(entriesToDelete)
          .select('_id')
          .lean();

        const idsToDelete = oldEntries.map(entry => entry._id);
        
        await HistoryModel.deleteMany({
          _id: { $in: idsToDelete }
        });

        this.logger.debug(
          `Cleaned up ${entriesToDelete} old history entries for ${entityType}:${entityId}`
        );
      }
    } catch (error) {
      this.logger.error(
        `Failed to cleanup old entries for ${entityType}:${entityId}`,
        error
      );
    }
  }
}
