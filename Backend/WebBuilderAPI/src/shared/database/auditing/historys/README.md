# History Module

The History Module provides comprehensive audit trail functionality for the WebBuilder API, automatically creating detailed history records for every database operation. This module works in conjunction with the main auditing module to provide complete change tracking.

## Features

- **Automatic History Tracking**: Creates history entries for all database operations (create, update, delete)
- **Complete Document State**: Stores the full document state at the time of each operation
- **Change Detection**: Tracks specific changes made during update operations
- **Per-Collection History**: Creates separate history collections for each entity type
- **User Context Integration**: Automatically captures user information from request context
- **Metadata Tracking**: Includes request metadata (IP, user agent, tenant, etc.)
- **Performance Optimized**: Includes proper indexing and cleanup mechanisms

## Architecture

### Components

1. **History Schema**: Generic schema for all history collections
2. **History Service**: Manages history creation and retrieval
3. **History Plugin**: Mongoose plugin for automatic history tracking
4. **History Module**: Main module that ties everything together

### Database Structure

For each entity collection (e.g., `applications`, `users`), a corresponding history collection is created:

- `applications` → `applications_history`
- `users` → `users_history`
- `[entity]` → `[entity]_history`

### History Entry Structure

Each history entry contains:

```typescript
{
  value: any,              // Complete document state at operation time
  operationType: string,   // 'create', 'update', or 'delete'
  userId: ObjectId,        // User who performed the operation
  datetime: Date,          // When the operation occurred
  entityId: ObjectId,      // ID of the original document
  entityType: string,      // Collection name (e.g., 'applications')
  changes?: any,           // Specific changes (for updates)
  metadata?: {             // Additional context
    requestId: string,
    userAgent: string,
    ipAddress: string,
    tenantId: string
  }
}
```

## How It Works

### Automatic Tracking Flow

1. **Database Operation Triggered**: User performs create/update/delete
2. **History Plugin Activated**: Mongoose hooks capture the operation
3. **Document State Captured**: Full document state is recorded
4. **History Entry Created**: Entry is saved to appropriate history collection
5. **Cleanup Performed**: Old entries are cleaned up if limit exceeded

### Operation Types

#### Create Operations
- Triggered on: `save()` for new documents
- Captures: Complete new document state
- Operation Type: `'create'`

#### Update Operations
- Triggered on: `updateOne()`, `findOneAndUpdate()`, `updateMany()`, `replaceOne()`
- Captures: Updated document state + specific changes
- Operation Type: `'update'`
- Includes: Before/after comparison of changed fields

#### Delete Operations
- Triggered on: `deleteOne()`, `findOneAndDelete()`, `deleteMany()`
- Captures: Document state before deletion
- Operation Type: `'delete'`

## Usage

### Automatic Usage

History tracking is completely automatic once the module is integrated. No code changes are required in your services:

```typescript
// This automatically creates history entries
await this.applicationModel.save(newApp);           // Creates 'create' history
await this.applicationModel.updateOne({...});       // Creates 'update' history
await this.applicationModel.deleteOne({...});       // Creates 'delete' history
```

### Retrieving History

Use the `HistoryService` to retrieve history data:

```typescript
import { HistoryService } from '../shared/database/auditing/historys';

@Injectable()
export class MyService {
  constructor(private historyService: HistoryService) {}

  // Get history for a specific entity
  async getEntityHistory(entityType: string, entityId: string) {
    return this.historyService.getHistory(entityType, entityId, 50);
  }

  // Get history by user
  async getUserHistory(userId: string) {
    return this.historyService.getHistoryByUser(userId, 100);
  }

  // Get history by operation type
  async getCreateHistory() {
    return this.historyService.getHistoryByOperation(OperationType.CREATE);
  }
}
```

### Manual History Creation

You can also manually create history entries:

```typescript
await this.historyService.createHistoryEntry(
  'applications',           // Entity type
  applicationId,           // Entity ID
  OperationType.UPDATE,    // Operation type
  updatedDocument,         // Document state
  userId,                  // User ID (optional, will use CLS)
  changes                  // Changes object (optional)
);
```

## Configuration

### Global Configuration

The history plugin can be configured globally in the database module:

```typescript
// Apply with custom configuration
mongoose.plugin(createHistoryPlugin({
  enabled: true,
  trackCreates: true,
  trackUpdates: true,
  trackDeletes: true
}));
```

### Per-Schema Configuration

You can also configure history tracking per schema:

```typescript
// Disable history for a specific schema
MySchema.plugin(createHistoryPlugin({
  enabled: false
}));

// Track only creates and updates
MySchema.plugin(createHistoryPlugin({
  trackCreates: true,
  trackUpdates: true,
  trackDeletes: false
}));
```

## Database Collections

### History Collections Created

For each entity type, a history collection is automatically created:

- **applications_history**: History for Application entities
- **users_history**: History for User entities
- **[entity]_history**: History for any other entity type

### Indexes

Each history collection includes optimized indexes:

```javascript
// Indexes created automatically
{ entityId: 1, datetime: -1 }           // Entity history, newest first
{ entityType: 1, datetime: -1 }         // Type history
{ userId: 1, datetime: -1 }             // User history
{ operationType: 1, datetime: -1 }      // Operation history
{ datetime: -1 }                        // General datetime index
{ entityType: 1, entityId: 1, datetime: -1 } // Compound index
```

## Performance Considerations

### Automatic Cleanup

- **Default Limit**: 1000 history entries per entity
- **Cleanup Strategy**: Removes oldest entries when limit exceeded
- **Configurable**: Can be adjusted per requirements

### Storage Optimization

- **Excluded Fields**: Automatically excludes `__v`, `updatedAt` from history
- **Lean Queries**: Uses lean queries for better performance
- **Proper Indexing**: Optimized indexes for common query patterns

### Error Handling

- **Non-blocking**: History failures don't break main operations
- **Graceful Degradation**: Continues working even if CLS context is missing
- **Logging**: Comprehensive error logging for debugging

## Example History Entries

### Create Operation
```json
{
  "_id": "...",
  "value": {
    "_id": "app123",
    "name": "My App",
    "status": "active",
    "createdBy": "user456",
    "createdDate": "2024-01-01T10:00:00Z"
  },
  "operationType": "create",
  "userId": "user456",
  "datetime": "2024-01-01T10:00:00Z",
  "entityId": "app123",
  "entityType": "applications",
  "metadata": {
    "requestId": "req_123",
    "userAgent": "Mozilla/5.0...",
    "ipAddress": "192.168.1.1",
    "tenantId": "tenant1"
  }
}
```

### Update Operation
```json
{
  "_id": "...",
  "value": {
    "_id": "app123",
    "name": "My Updated App",
    "status": "active",
    "lastchangedBy": "user789",
    "lastchangedDate": "2024-01-02T15:30:00Z"
  },
  "operationType": "update",
  "userId": "user789",
  "datetime": "2024-01-02T15:30:00Z",
  "entityId": "app123",
  "entityType": "applications",
  "changes": {
    "name": {
      "from": "My App",
      "to": "My Updated App"
    }
  },
  "metadata": { ... }
}
```

### Delete Operation
```json
{
  "_id": "...",
  "value": {
    "_id": "app123",
    "name": "My Updated App",
    "status": "active"
  },
  "operationType": "delete",
  "userId": "user789",
  "datetime": "2024-01-03T09:15:00Z",
  "entityId": "app123",
  "entityType": "applications",
  "metadata": { ... }
}
```

## Integration with Main Auditing Module

The History Module works seamlessly with the main auditing module:

1. **Audit Fields**: Main module adds `createdBy`, `lastchangedBy`, etc.
2. **History Tracking**: History module captures complete document states
3. **User Context**: Both modules share the same CLS-based user context
4. **Request Metadata**: Both modules capture the same request information

## Monitoring and Maintenance

### Monitoring History Growth

```typescript
// Check history collection sizes
const collections = await mongoose.connection.db.listCollections().toArray();
const historyCollections = collections.filter(c => c.name.endsWith('_history'));

for (const collection of historyCollections) {
  const stats = await mongoose.connection.db.collection(collection.name).stats();
  console.log(`${collection.name}: ${stats.count} documents, ${stats.size} bytes`);
}
```

### Manual Cleanup

```typescript
// Clean up old history entries
const cutoffDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000); // 90 days ago

await HistoryModel.deleteMany({
  datetime: { $lt: cutoffDate }
});
```

## Future Enhancements

The History Module is designed to support future enhancements:

1. **Audit Reports**: Generate comprehensive audit reports
2. **Change Analytics**: Analyze patterns in entity changes
3. **Compliance Features**: Support for regulatory compliance requirements
4. **Data Archiving**: Archive old history data to external storage
5. **Real-time Notifications**: Notify on specific types of changes
6. **Advanced Querying**: Complex queries across history data

## Troubleshooting

### Common Issues

1. **Missing History Entries**: Check if user context is available in CLS
2. **Performance Issues**: Monitor history collection sizes and cleanup frequency
3. **Storage Growth**: Implement regular cleanup or archiving strategies

### Debug Logging

Enable debug logging to troubleshoot issues:

```typescript
// In your logger configuration
{
  level: 'debug',
  categories: ['HistoryService', 'HistoryPlugin']
}
```

The History Module provides a robust foundation for complete audit trail functionality while maintaining excellent performance and reliability.
