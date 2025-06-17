import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePermissionGroupDto {
  @ApiProperty({ description: 'Permission group name', example: 'user-management' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Display name for the permission group', example: 'User Management' })
  @IsString()
  @IsNotEmpty()
  displayName: string;
}
