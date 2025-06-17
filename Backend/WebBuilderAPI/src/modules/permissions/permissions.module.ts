import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './schemas/role.schema';
import { Permission, PermissionSchema } from './schemas/permission.schema';
import { PermissionGrant, PermissionGrantSchema } from './schemas/permission.grant.schema';
import { PermissionGroup, PermissionGroupSchema } from './schemas/permission.groups.schema';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { UsersModule } from '../users/users.module';
import { BaseAuthorizationGuard } from './guards/BaseAuthorizationGuard';
import { AuthorizationService } from './authorization.service';
import { UserRole, UserRoleSchema } from './schemas/user.roles.schema';

@Module({
  imports: [
    UsersModule,
      MongooseModule.forFeature([
        { name: Role.name, schema: RoleSchema },
        { name: Permission.name, schema: PermissionSchema},
        {
          name: PermissionGrant.name,
          schema: PermissionGrantSchema
        },
        { name: PermissionGroup.name, schema: PermissionGroupSchema},
        { name: UserRole.name, schema: UserRoleSchema}
      ]),
    ],
  providers: [PermissionsService, AuthorizationService, BaseAuthorizationGuard],
  controllers: [PermissionsController],
  exports: [PermissionsService, BaseAuthorizationGuard]
  
})
export class PermissionsModule {}
