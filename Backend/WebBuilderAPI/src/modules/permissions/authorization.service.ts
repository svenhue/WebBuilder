import { Injectable, NotFoundException, ForbiddenException, Inject } from '@nestjs/common';
import { Role } from './schemas/role.schema';
import { User } from '../users/schemas/user.schema';
import { IAuthorizationContext } from './IAuthorizationContext';
import { PermissionsService } from './permissions.service';

@Injectable()
export class AuthorizationService {
  constructor(
    @Inject() private permissionService: PermissionsService

  ) {

  }

  public authorizeUser(user: User, context: IAuthorizationContext): boolean{
    if(!user){
        throw new NotFoundException("User is undefined. Cant check permissions")
    }
    if(!context){
        return true
    }
    //todo sub not clean
    const grants = this.permissionService.getAllPermissionGrantsForUser(user['sub'])

    return false;
  }

}
