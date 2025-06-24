import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsBoolean, IsOptional, IsDateString, IsNumber, IsObject } from 'class-validator';
import {  GrantProviders, PermissionAction, ResourceType } from '../schemas/permission.grant.schema';

export class CreatePermissionGrantDto {
  @ApiProperty({ description: 'Permission identifier', example: 'template.read' })
  @IsString()
  permissionId: string;

  @ApiProperty({ description: 'Grant identifier (user ID, role ID, etc.)', example: '507f1f77bcf86cd799439011' })
  @IsString()
  grantId: string;

  @ApiProperty({ enum: GrantProviders, description: 'Type of grant', example: GrantProviders.USER })
  @IsEnum(GrantProviders)
  grantProvider: GrantProviders;

  @ApiProperty({ enum: ResourceType, description: 'Type of resource', example: ResourceType.TEMPLATE })
  @IsEnum(ResourceType)
  resourceType: ResourceType;

  @ApiProperty({ description: 'Resource identifier', example: '507f1f77bcf86cd799439012' })
  @IsString()
  resourceId: string;

  @ApiProperty({ enum: PermissionAction, description: 'Permission action', example: PermissionAction.READ })
  @IsEnum(PermissionAction)
  action: PermissionAction;

  @ApiProperty({ description: 'Whether the grant is active', example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ description: 'Expiration date', example: '2024-12-31T23:59:59Z', required: false })
  @IsOptional()
  @IsDateString()
  expiresAt?: Date;

  @ApiProperty({ description: 'Additional conditions', example: { department: 'IT' }, required: false })
  @IsOptional()
  @IsObject()
  conditions?: Record<string, any>;

  @ApiProperty({ description: 'Priority level', example: 1, required: false })
  @IsOptional()
  @IsNumber()
  priority?: number;

  @ApiProperty({ description: 'Source of the grant', example: 'admin-panel', required: false })
  @IsOptional()
  @IsString()
  source?: string;

  @ApiProperty({ description: 'Who granted this permission', example: '507f1f77bcf86cd799439013', required: false })
  @IsOptional()
  @IsString()
  grantedBy?: string;

  @ApiProperty({ description: 'Reason for granting', example: 'Project assignment', required: false })
  @IsOptional()
  @IsString()
  reason?: string;
}
