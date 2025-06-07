# GitLab Integration Module

This module provides comprehensive GitLab integration for the WebBuilder API, enabling seamless interaction with a local GitLab Community server.

## Features

### Repository Management
- Create, read, update, and delete GitLab repositories
- Sync repositories with local database
- Multi-tenant repository isolation
- Repository statistics and analytics

### File Management
- Browse repository files and directories
- Read, create, update, and delete files
- Commit management with custom messages
- Branch and tag support

### CI/CD Pipeline Management
- Trigger pipelines with custom variables
- Monitor pipeline status and progress
- Cancel running pipelines
- Pipeline history and analytics
- Webhook support for real-time updates

### User Management
- Create and manage GitLab users
- Sync users with WebBuilder user system
- Role-based access control
- User permissions and project access

### Code Export
- Export repository code in multiple formats (ZIP, TAR.GZ, etc.)
- Download complete repository archives
- Version-specific exports

## API Endpoints

### Repository Endpoints

#### Create Repository
```http
POST /gitlab/repositories
Content-Type: application/json

{
  "name": "my-webbuilder-app",
  "description": "WebBuilder application repository",
  "visibility": "private",
  "applicationId": "507f1f77bcf86cd799439011"
}
```

#### Get All Repositories
```http
GET /gitlab/repositories
```

#### Get Repository by ID
```http
GET /gitlab/repositories/{id}
```

#### Update Repository
```http
PUT /gitlab/repositories/{id}
Content-Type: application/json

{
  "description": "Updated description",
  "visibility": "internal"
}
```

#### Delete Repository
```http
DELETE /gitlab/repositories/{id}
```

#### Sync Repository with GitLab
```http
POST /gitlab/repositories/{id}/sync
```

### File Management Endpoints

#### Get Repository Files
```http
GET /gitlab/repositories/{id}/files?path=src&ref=main
```

#### Get File Content
```http
GET /gitlab/repositories/{id}/files/content?file_path=src/index.js&ref=main
```

#### Create or Update File
```http
POST /gitlab/repositories/{id}/files
Content-Type: application/json

{
  "file_path": "src/index.js",
  "content": "console.log('Hello World');",
  "commit_message": "Add new file",
  "branch": "main",
  "author_name": "John Doe",
  "author_email": "john@example.com"
}
```

#### Delete File
```http
DELETE /gitlab/repositories/{id}/files?file_path=src/old-file.js&commit_message=Remove old file
```

### Pipeline Endpoints

#### Trigger Pipeline
```http
POST /gitlab/repositories/{id}/pipelines/trigger
Content-Type: application/json

{
  "ref": "main",
  "variables": {
    "PIPELINE_TYPE": "build",
    "NODE_VERSION": "18",
    "ENVIRONMENT": "production"
  }
}
```

#### Get Repository Pipelines
```http
GET /gitlab/repositories/{id}/pipelines
```

#### Get Pipeline by ID
```http
GET /gitlab/pipelines/{id}
```

#### Cancel Pipeline
```http
POST /gitlab/pipelines/{id}/cancel
```

### User Management Endpoints

#### Create GitLab User
```http
POST /gitlab/users
Content-Type: application/json

{
  "username": "john.doe",
  "email": "john.doe@example.com",
  "name": "John Doe",
  "password": "SecurePassword123!",
  "projectsLimit": 100000,
  "canCreateGroup": true,
  "isAdmin": false,
  "webbuilderUserId": "507f1f77bcf86cd799439011"
}
```

#### Get All GitLab Users
```http
GET /gitlab/users
```

#### Get GitLab User by ID
```http
GET /gitlab/users/{id}
```

#### Update GitLab User
```http
PUT /gitlab/users/{id}
Content-Type: application/json

{
  "name": "John Smith",
  "projectsLimit": 200000
}
```

#### Delete GitLab User
```http
DELETE /gitlab/users/{id}
```

### Export Endpoints

#### Export Repository Code
```http
GET /gitlab/repositories/{id}/export?format=zip
```

### CI/CD Configuration Endpoints

#### Generate CI/CD Configuration
```http
POST /gitlab/repositories/{id}/ci-config
Content-Type: application/json

{
  "template": "nuxt",
  "buildCommand": "npm run build",
  "outputDirectory": ".output",
  "nodeVersion": "18",
  "environment": {
    "NODE_ENV": "production",
    "API_URL": "https://api.example.com"
  }
}
```

### Statistics Endpoints

#### Get Repository Statistics
```http
GET /gitlab/repositories/{id}/stats
```

### Webhook Endpoints

#### Pipeline Webhook
```http
POST /gitlab/webhooks/pipeline
Content-Type: application/json

{
  "object_kind": "pipeline",
  "object_attributes": {
    "id": 123,
    "status": "success",
    "ref": "main"
  }
}
```

#### Push Webhook
```http
POST /gitlab/webhooks/push
Content-Type: application/json

{
  "object_kind": "push",
  "ref": "refs/heads/main",
  "commits": []
}
```

## Configuration

### Environment Variables

Add the following environment variables to your `.env` file:

```env
# GitLab Configuration
GITLAB_BASE_URL=http://localhost:8080
GITLAB_TOKEN=your-gitlab-admin-token

# MongoDB Configuration (if not already set)
MONGODB_URI=mongodb://localhost:27017/webbuilder
DATABASE_NAME=webbuilder
```

### GitLab Server Setup

1. Install GitLab Community Edition locally
2. Create an admin access token
3. Configure the base URL and token in environment variables
4. Ensure the GitLab server is accessible from the WebBuilder API

## Database Schemas

### GitlabRepository Schema
- Stores repository metadata and sync status
- Links to WebBuilder applications
- Multi-tenant isolation
- GitLab project mapping

### GitlabUser Schema
- Stores user information and permissions
- Links to WebBuilder users
- Access token management
- Role and permission tracking

### GitlabPipeline Schema
- Stores pipeline execution history
- Build configuration and results
- Deployment tracking
- Performance metrics

## Multi-Tenancy

All GitLab resources are isolated by tenant:
- Repositories are scoped to tenant
- Users are tenant-specific
- Pipelines inherit tenant context
- Database indexes ensure performance

## Security Features

- OAuth2 integration for secure authentication
- Encrypted token storage
- Role-based access control
- Tenant isolation
- API rate limiting
- Input validation and sanitization

## CI/CD Templates

The module includes pre-built CI/CD templates for:
- Node.js applications
- Vue.js projects
- React applications
- Nuxt.js applications
- Static websites

Templates automatically configure:
- Build stages
- Test execution
- Artifact management
- Deployment pipelines
- Environment variables

## Error Handling

Comprehensive error handling for:
- GitLab API failures
- Network connectivity issues
- Authentication errors
- Permission violations
- Resource not found scenarios

## Monitoring and Analytics

Built-in analytics for:
- Repository activity
- Pipeline success rates
- Build performance metrics
- User activity tracking
- Resource utilization

## Best Practices

1. **Repository Management**
   - Use descriptive repository names
   - Set appropriate visibility levels
   - Regular sync with GitLab server
   - Implement proper branching strategy

2. **Pipeline Configuration**
   - Use environment-specific variables
   - Implement proper artifact management
   - Set reasonable timeout values
   - Monitor pipeline performance

3. **User Management**
   - Follow principle of least privilege
   - Regular access reviews
   - Secure password policies
   - Monitor user activity

4. **Security**
   - Rotate access tokens regularly
   - Use HTTPS for GitLab communication
   - Implement proper authentication
   - Monitor for suspicious activity

## Troubleshooting

### Common Issues

1. **GitLab Connection Failed**
   - Check GITLAB_BASE_URL configuration
   - Verify GitLab server is running
   - Confirm network connectivity

2. **Authentication Errors**
   - Verify GITLAB_TOKEN is valid
   - Check token permissions
   - Ensure token hasn't expired

3. **Repository Sync Issues**
   - Check GitLab project permissions
   - Verify tenant isolation
   - Review sync status logs

4. **Pipeline Failures**
   - Check .gitlab-ci.yml syntax
   - Verify runner availability
   - Review pipeline variables

## Development

### Adding New Features

1. Update schemas if needed
2. Implement service methods
3. Add controller endpoints
4. Update API documentation
5. Add comprehensive tests
6. Update this README

### Testing

Run tests with:
```bash
npm run test
npm run test:e2e
```

### Contributing

1. Follow existing code patterns
2. Add comprehensive tests
3. Update documentation
4. Follow security best practices
5. Ensure multi-tenant compatibility
