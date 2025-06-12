import { Injectable, NotFoundException, ForbiddenException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PermissionGrant, PermissionGrantDocument, GrantType, PermissionAction, ResourceType } from './schemas/permission.grant.schema';
import { Permission, PermissionDocument } from './schemas/permission.schema';
import { PermissionGroup } from './schemas/permission.groups.schema';
import { Role } from './schemas/role.schema';
import { User } from '../users/schemas/user.schema';
import { IAuthorizationContext } from './IAuthorizationContext';

@Injectable()
export class AuthorizationService {
  constructor(
    @Inject() private permissionService: PermissionsService
  ) {

  }

  public authorizeUser(user: User, context: IAuthorizationContext): boolean{

    return false;
  }
}
