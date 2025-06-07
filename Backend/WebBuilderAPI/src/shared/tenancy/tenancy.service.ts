import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable({ scope: Scope.REQUEST })
export class TenancyService {
  private tenantId: string;

  constructor(private configService: ConfigService) {
    this.tenantId = this.configService.get('DEFAULT_TENANT') || 'default';
  }

  setTenantId(tenantId: string): void {
    this.tenantId = tenantId;
  }

  getTenantId(): string {
    return this.tenantId;
  }

  getTenantDatabaseName(): string {
    return `${this.configService.get('DATABASE_NAME')}_${this.tenantId}`;
  }

  getTenantCollectionName(baseCollectionName: string): string {
    return `${this.tenantId}_${baseCollectionName}`;
  }

  isValidTenant(tenantId: string): boolean {
    // Add your tenant validation logic here
    // For now, we'll accept any non-empty string
    return tenantId && tenantId.length > 0 && /^[a-zA-Z0-9_-]+$/.test(tenantId);
  }

  getDefaultTenant(): string {
    return this.configService.get('DEFAULT_TENANT') || 'default';
  }
}
