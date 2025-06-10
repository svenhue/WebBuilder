import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Types } from 'mongoose';
import { IAuditContextProvider } from '../interfaces/auditable.interface';

/**
 * Default audit context provider using nestjs-cls
 * Retrieves user information from the current request context
 */
@Injectable()
export class AuditContextService implements IAuditContextProvider {
  constructor(private readonly clsService: ClsService) {}

  /**
   * Gets the current user ID from the CLS store
   * @returns The current user ID or null if not available
   */
  getCurrentUserId(): Types.ObjectId | string | null {
    try {
      const user = this.clsService.get('user');
      if (user && (user.id || user._id)) {
        return user.id || user._id;
      }
      return null;
    } catch (error) {
      // CLS store might not be available in some contexts (e.g., background jobs)
      return null;
    }
  }

  /**
   * Gets additional audit context information
   * Can be extended to include more context data
   * @returns Additional context data
   */
  getAdditionalContext(): Record<string, any> {
    try {
      const user = this.clsService.get('user');
      const requestId = this.clsService.get('requestId');
      const tenantId = this.clsService.get('tenantId');
      
      return {
        requestId,
        tenantId,
        userEmail: user?.email,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {};
    }
  }

  /**
   * Sets the current user in the CLS store
   * Useful for testing or manual context setting
   * @param user The user object to set
   */
  setCurrentUser(user: any): void {
    //todo handle relational database that dont have user.
    this.clsService.set('user', {
      id: user.id,
      email: user.email
    });
  }

  /**
   * Gets the full user object from the CLS store
   * @returns The current user object or null
   */
  getCurrentUser(): any {
    try {
      return this.clsService.get('user');
    } catch (error) {
      return null;
    }
  }
}
