import { Module, Global, OnModuleInit } from '@nestjs/common';
import { HistoryService } from './services/history.service';
import { setGlobalHistoryService } from './plugins/history.plugin';

/**
 * Global history module
 * Provides history tracking capabilities across the entire application
 */
@Global()
@Module({
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule implements OnModuleInit {
  constructor(private readonly historyService: HistoryService) {}

  /**
   * Initialize the module and set up global history service
   */
  onModuleInit() {
    // Set the global history service for the mongoose plugin
    setGlobalHistoryService(this.historyService);
  }
}
