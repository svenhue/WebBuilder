
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';

import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../authorization.service';
import { AUTH_KEY } from '../decorators/authorization.decorator';
import { IAuthorizationContext } from '../IAuthorizationContext';

//depends on auth guards to access request.user
@Injectable()
export class BaseAuthorizationGuard implements CanActivate {

    constructor(
        @Inject() private authService: AuthorizationService,
        private reflector: Reflector
    ){

    }

    public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        
        const authContext: IAuthorizationContext = this.reflector.getAllAndOverride<IAuthorizationContext>(AUTH_KEY, [
              context.getHandler(),
              context.getClass(),
        ]);

        if(!authContext || (!authContext.permissions && !authContext.roles)){
            return true;
        }
        const user = request['user']
        

        const userCanActivate = this.authService.authorizeUser(user, authContext)

        if(!userCanActivate){
            throw new ForbiddenException("User" + user?.email + "has no permission to action" )
        }else{
            return true
        }
        return false;
    }
}