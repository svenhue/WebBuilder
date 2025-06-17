# Auditing Module

This module provides comprehensive auditing capabilities for the WebBuilder API, automatically tracking who created and modified database entities, along with timestamps.

## Features

- **Automatic Audit Fields**: Adds `createdBy`, `lastchangedBy`, `createdDate`, and `lastchangedDate` to all entities
- **Request Context Integration**: Uses `nestjs-cls` to automatically capture user information from HTTP requests
- **Mongoose Plugin**: Global plugin that works with all Mongoose schemas
- **Extensible Design**: SOLID principles with interfaces for custom audit context providers
- **Performance Optimized**: Includes database indexes for audit fields

## Architecture

### Components

1. **AuditableSchema**: Base schema class that entities can extend
2. **AuditContextService**: Service that retrieves user context from CLS store
3. **AuditPlugin**: Mongoose plugin that automatically sets audit fields
4. **AuditContextInterceptor**: Interceptor that captures request context
5. **AuditingModule**: Main module that ties everything together

### Flow

1. HTTP request comes in
2. `AuditContextInterceptor` extracts user info and stores it in CLS
3. Database operations trigger the `AuditPlugin`
4. Plugin uses `AuditContextService` to get current user from CLS
5. Audit fields are automatically set

## Usage

### 1. Extend AuditableSchema

```typescript
import { Schema } from '@nestjs/mongoose';
import { AuditableSchema } from '../../../shared/database/auditing';

@Schema({ timestamps: true })
export class MyEntity extends AuditableSchema {
  // Your entity fields here
  @Prop()
  name: string;
}
```

### 2. Automatic Auditing

Once your schema extends `AuditableSchema`, auditing happens automatically:

- **Create operations**: Sets `createdBy`, `createdDate`, `lastchangedBy`, `lastchangedDate`
- **Update operations**: Updates `lastchangedBy` and `lastchangedDate`

### 3. Manual Context Setting (for testing)

```typescript
import { AuditContextService } from '../shared/database/auditing';

constructor(private auditContext: AuditContextService) {}

// Set user manually (useful for testing)
this.auditContext.setCurrentUser({ id: 'user123', email: 'test@example.com' });
```

## Configuration

### Custom Audit Context Provider

You can create a custom audit context provider:

```typescript
import { IAuditContextProvider } from '../shared/database/auditing';

@Injectable()
export class CustomAuditContextProvider implements IAuditContextProvider {
  getCurrentUserId(): string | null {
    // Your custom logic here
    return 'custom-user-id';
  }
}
```

### Schema-Specific Configuration

Apply audit plugin with custom configuration:

```typescript
import { createAuditPlugin } from '../shared/database/auditing';

const MySchema = new Schema({...});

// Apply with custom config
MySchema.plugin(createAuditPlugin({
  enableCreatedBy: true,
  enableLastchangedBy: true,
  enableCreatedDate: false, // Disable created date
  enableLastchangedDate: true,
}));
```

## Database Fields

The auditing module adds these fields to your entities:

- `createdBy`: ObjectId reference to User who created the entity
- `lastchangedBy`: ObjectId reference to User who last modified the entity
- `createdDate`: Date when the entity was created
- `lastchangedDate`: Date when the entity was last modified

## Indexes

The module automatically creates indexes for performance:

- `createdBy: 1`
- `lastchangedBy: 1`
- `createdDate: 1`
- `lastchangedDate: 1`

## Request Context

The interceptor captures additional context information:

- `user`: Current user object
- `tenantId`: Tenant ID (if available)
- `requestId`: Unique request identifier
- `requestPath`: HTTP request path
- `requestMethod`: HTTP method
- `userAgent`: User agent string
- `ipAddress`: Client IP address

## Future Extensions

The module is designed to be extensible for future audit table functionality:

1. **Audit Trail Table**: Track all changes in a separate audit log table
2. **Change Detection**: Compare old vs new values
3. **Audit Queries**: Built-in queries for audit history
4. **Audit Reports**: Generate audit reports and analytics

## Error Handling

The module gracefully handles scenarios where:

- CLS store is not available (e.g., background jobs)
- User context is missing
- Database operations fail

In these cases, audit fields may be null, but the operation continues normally.

## Testing

For testing, you can manually set the audit context:

```typescript
beforeEach(() => {
  const auditContext = app.get(AuditContextService);
  auditContext.setCurrentUser({ 
    id: 'test-user-id', 
    email: 'test@example.com' 
  });
});
```

## Performance Considerations

- The module adds minimal overhead to database operations
- CLS (AsyncLocalStorage) has < 1% performance impact
- Indexes are created for efficient querying of audit fields
- Plugin hooks are optimized to run only when necessary
