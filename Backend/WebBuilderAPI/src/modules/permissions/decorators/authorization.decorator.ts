import { SetMetadata } from '@nestjs/common';
import { IAuthorizationContext } from '../IAuthorizationContext';


export const AUTH_KEY = 'Authorization'

// names of roles and permissions
export function Auth(input: IAuthorizationContext){
    SetMetadata(AUTH_KEY, input)

}