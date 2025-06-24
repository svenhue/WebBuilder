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

  public async authorizeUser(user: User, context: IAuthorizationContext): Promise<boolean>{
    if(!user){
        throw new NotFoundException("User is undefined. Cant check permissions")
    }
    if(!context){
        return true
    }
    
    //todo sub not clean
    const grants = await this.permissionService.getAllPermissionGrantsForUser(user['sub'])

    for(const permission of context?.permissions){
        if(grants.find(grant => grant.providerKey == permission) == undefined){
            return false
        }
    }
    for(const role of context?.roles){
        if(grants.find(grant => grant.providerKey == role)){
          return true
        }
    }
    return false;
  }

}
