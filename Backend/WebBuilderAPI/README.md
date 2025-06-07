# WebBuilder API

A comprehensive NestJS API with multi-tenancy, OAuth2 authentication, and configuration management for the WebBuilder platform.

## Features

- **Multi-Tenancy**: Complete tenant isolation with automatic tenant detection from headers, query parameters, or subdomains
- **OAuth2 Server**: Full OAuth2 implementation with authorization code flow
- **JWT Authentication**: Secure JWT-based authentication with refresh tokens
- **User Management**: Complete user CRUD operations with tenant isolation
- **Permission Management**: Scalable RBAC (Role-Based Access Control) system
- **Configuration APIs**: REST APIs for Application, Page, and View configurations
- **MongoDB Integration**: Mongoose ODM with tenant-aware collections
- **Swagger Documentation**: Auto-generated API documentation
- **Security**: Helmet, CORS, rate limiting, and input validation

## Project Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts           # Root application module
├── shared/                 # Shared modules and utilities
│   ├── database/           # Database configuration
│   └── tenancy/            # Multi-tenancy implementation
│       ├── tenancy.service.ts
│       ├── tenant.interceptor.ts
│       └── tenant.guard.ts
└── modules/                # Feature modules
    ├── auth/               # Authentication & OAuth2
    ├── users/              # User management
    ├── permissions/        # Permission & role management
    ├── applications/       # Application configuration API
    ├── pages/              # Page configuration API
    └── views/              # View configuration API
```

## Multi-Tenancy Implementation

The system supports multiple tenancy strategies:

1. **Header-based**: `x-tenant-id` header
2. **Query parameter**: `?tenantId=tenant1`
3. **Subdomain**: `tenant1.domain.com`

All database operations are automatically scoped to the current tenant.

## OAuth2 Implementation

The API includes a complete OAuth2 server supporting:

- Authorization Code Flow
- Client Credentials Flow
- Refresh Token Flow
- PKCE (Proof Key for Code Exchange)
- Scopes and permissions

## Permission System

Scalable permission system with:

- **Permissions**: Granular permissions (e.g., `users:read`, `applications:write`)
- **Roles**: Collections of permissions (e.g., `admin`, `editor`, `viewer`)
- **User Permissions**: Direct user-to-permission assignments
- **Hierarchical Roles**: Support for role inheritance
- **Resource-based Permissions**: Permissions on specific resources

## Configuration APIs

REST APIs for managing:

- **IApplicationConfiguration**: Complete application settings
- **IPageConfiguration**: Page-level configurations
- **IViewConfiguration**: Component and view configurations

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/webbuilder
DATABASE_NAME=webbuilder

# Server
PORT=3001
NODE_ENV=development

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_REFRESH_EXPIRES_IN=7d

# OAuth2
OAUTH2_CLIENT_ID=your-oauth2-client-id
OAUTH2_CLIENT_SECRET=your-oauth2-client-secret
OAUTH2_REDIRECT_URI=http://localhost:3001/auth/oauth2/callback

# Multi-tenancy
DEFAULT_TENANT=default
TENANT_HEADER=x-tenant-id

# Security
BCRYPT_ROUNDS=12
RATE_LIMIT_TTL=60
RATE_LIMIT_LIMIT=100
```

## Installation

```bash
# Install dependencies
npm install

# Start MongoDB (if running locally)
mongod

# Start the application
npm run start:dev
```

## API Documentation

Once running, visit:
- **Swagger UI**: http://localhost:3001/api/docs
- **API Base**: http://localhost:3001/api

## Usage Examples

### Authentication

```bash
# Register a new user
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}

# Login
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Multi-Tenant Requests

```bash
# Using header
curl -H "x-tenant-id: tenant1" http://localhost:3001/api/users

# Using query parameter
curl http://localhost:3001/api/users?tenantId=tenant1

# Using subdomain (requires DNS setup)
curl http://tenant1.localhost:3001/api/users
```

### OAuth2 Flow

```bash
# 1. Get authorization code
GET /api/auth/oauth2/authorize?client_id=CLIENT_ID&response_type=code&redirect_uri=REDIRECT_URI&scope=read

# 2. Exchange code for token
POST /api/auth/oauth2/token
{
  "grant_type": "authorization_code",
  "code": "AUTH_CODE",
  "client_id": "CLIENT_ID",
  "client_secret": "CLIENT_SECRET",
  "redirect_uri": "REDIRECT_URI"
}
```

## Development

```bash
# Development mode with hot reload
npm run start:dev

# Build for production
npm run build

# Run tests
npm run test

# Run e2e tests
npm run test:e2e

# Lint code
npm run lint
```

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Request throttling
- **Input Validation**: Class-validator integration
- **Password Hashing**: bcrypt with configurable rounds
- **JWT Security**: Secure token generation and validation

## Scalability Considerations

- **Database Indexing**: Optimized indexes for tenant isolation
- **Caching**: Redis-compatible caching layer
- **Horizontal Scaling**: Stateless design for load balancing
- **Database Sharding**: Tenant-based sharding support
- **Microservices Ready**: Modular architecture for service extraction

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License
