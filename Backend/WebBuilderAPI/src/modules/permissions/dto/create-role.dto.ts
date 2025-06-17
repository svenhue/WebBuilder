import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ description: 'Role name', example: 'admin' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Display name for the role', example: 'Administrator' })
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @ApiProperty({ description: 'Normalized role name', example: 'ADMIN' })
  @IsString()
  @IsNotEmpty()
  normalizedName: string;

  @ApiProperty({ description: 'Whether this is a default role', example: false })
  @IsBoolean()
  isDefault: boolean;

  @ApiProperty({ description: 'Whether this role is public', example: true })
  @IsBoolean()
  isPublic: boolean;
}
