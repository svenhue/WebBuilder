import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { TenancyService } from './tenancy.service';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  constructor(
    private tenancyService: TenancyService,
    private configService: ConfigService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const tenantHeader = this.configService.get('TENANT_HEADER') || 'x-tenant-id';
    
    // Extract tenant ID from header, query parameter, or subdomain
    let tenantId = request.headers[tenantHeader] || 
                   request.query.tenantId || 
                   this.extractTenantFromSubdomain(request.get('host'));

    // Validate and set tenant
    if (!tenantId || !this.tenancyService.isValidTenant(tenantId)) {
      tenantId = this.tenancyService.getDefaultTenant();
    }

    this.tenancyService.setTenantId(tenantId);

    return next.handle();
  }

  private extractTenantFromSubdomain(host: string): string | null {
    if (!host) return null;
    
    const parts = host.split('.');
    if (parts.length > 2) {
      // Assuming format: tenant.domain.com
      return parts[0];
    }
    
    return null;
  }
}
