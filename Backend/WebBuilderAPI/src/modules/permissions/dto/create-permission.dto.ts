import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({ description: 'Permission name', example: 'users.read' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Parent permission name', example: 'users' })
  @IsString()
  @IsNotEmpty()
  parentName: string;

  @ApiProperty({ description: 'Display name for the permission', example: 'Read Users' })
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @ApiProperty({ description: 'Whether the permission is enabled', example: true })
  @IsBoolean()
  isEnabled: boolean;

  @ApiProperty({ description: 'Group name this permission belongs to', example: 'User Management' })
  @IsString()
  @IsNotEmpty()
  groupName: string;
}
