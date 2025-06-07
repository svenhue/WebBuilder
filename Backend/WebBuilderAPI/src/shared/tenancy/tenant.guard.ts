import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { TenancyService } from './tenancy.service';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private tenancyService: TenancyService) {}

  canActivate(context: ExecutionContext): boolean {
    const tenantId = this.tenancyService.getTenantId();
    
    if (!tenantId || !this.tenancyService.isValidTenant(tenantId)) {
      throw new ForbiddenException('Invalid or missing tenant information');
    }

    return true;
  }
}
