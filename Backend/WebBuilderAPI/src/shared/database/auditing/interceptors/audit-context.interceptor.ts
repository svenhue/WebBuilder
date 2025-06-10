import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClsService } from 'nestjs-cls';

/**
 * Interceptor to set audit context from the request
 * Extracts user information from the request and stores it in CLS
 */
@Injectable()
export class AuditContextInterceptor implements NestInterceptor {
  constructor(private readonly clsService: ClsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    
    // Extract user from request (set by authentication guards/middleware)
    if (request.user) {
      this.clsService.set('user', {
        email: request.user.email,
        id: request.user.sub
      });
    }

    // Extract tenant information if available
    if (request.tenantId) {
      this.clsService.set('tenantId', request.tenantId);
    }

    // Set request ID for tracing
    const requestId = request.headers['x-request-id'] || 
                     request.headers['request-id'] || 
                     `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.clsService.set('requestId', requestId);

    // Set additional context information
    this.clsService.set('requestPath', request.path);
    this.clsService.set('requestMethod', request.method);
    this.clsService.set('userAgent', request.headers['user-agent']);
    this.clsService.set('ipAddress', request.ip || request.connection?.remoteAddress);

    return next.handle();
  }
}
