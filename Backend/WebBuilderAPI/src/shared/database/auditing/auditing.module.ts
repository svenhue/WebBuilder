import { Module, Global, OnModuleInit } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { AuditContextService } from './services/audit-context.service';
import { setGlobalAuditContextProvider } from './plugins/audit.plugin';
import { HistoryModule } from './historys/history.module';
import { AuditContextInterceptor } from './interceptors/audit-context.interceptor';

/**
 * Global auditing module
 * Provides auditing capabilities across the entire application
 */
@Global()
@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { 
        mount: true,
        generateId: true,
        idGenerator: (req: any) => req.headers['x-request-id'] || `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      },
    }),
    HistoryModule,
  ],
  providers: [AuditContextService, AuditContextInterceptor],
  exports: [AuditContextService, ClsModule, HistoryModule],
})
export class AuditingModule implements OnModuleInit {
  constructor(private readonly auditContextService: AuditContextService) {}

  /**
   * Initialize the module and set up global audit context provider
   */
  onModuleInit() {
    // Set the global audit context provider for the mongoose plugin
    setGlobalAuditContextProvider(this.auditContextService);
  }
}
