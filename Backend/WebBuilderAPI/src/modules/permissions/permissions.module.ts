import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './schemas/role.schema';
import { Permission, PermissionSchema } from './schemas/permission.schema';
import { PermissionGrant, PermissionGrantSchema } from './schemas/permission.grant.schema';
import { PermissionGroup, PermissionGroupSchema } from './schemas/permission.groups.schema';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { UsersModule } from '../users/users.module';

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
      ]),
    ],
  providers: [PermissionsService],
  controllers: [PermissionsController],
  exports: [PermissionsService],
  
})
export class PermissionsModule {}
