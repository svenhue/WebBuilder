import { Module, Global } from '@nestjs/common';
import { TenancyService } from './tenancy.service';
import { TenantInterceptor } from './tenant.interceptor';
import { TenantGuard } from './tenant.guard';

@Global()
@Module({
  providers: [TenancyService, TenantInterceptor, TenantGuard],
  exports: [TenancyService, TenantInterceptor, TenantGuard],
})
export class TenancyModule {}
