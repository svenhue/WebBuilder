import { IsString, IsNumber, IsBoolean, IsOptional, IsArray, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty({ description: 'Application ID', example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'Application name', example: 'My WebBuilder App' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Root component configuration' })
  @IsOptional()
  @IsObject()
  rootComponent?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Application mode', example: 'development' })
  @IsOptional()
  @IsString()
  mode?: string;

  @ApiPropertyOptional({ description: 'Application modules', type: [Object] })
  @IsOptional()
  @IsArray()
  modules?: Record<string, any>[];

  @ApiProperty({ description: 'Is production environment', example: false })
  @IsBoolean()
  isProduction: boolean;

  @ApiProperty({ description: 'Deployment mode', example: 'spa' })
  @IsString()
  deploymentMode: string;

  @ApiPropertyOptional({ description: 'Page configurations', type: [Object] })
  @IsOptional()
  @IsArray()
  pages?: Record<string, any>[];

  @ApiPropertyOptional({ description: 'Application stylesheets configuration' })
  @IsOptional()
  @IsObject()
  stylesheets?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Global application variables' })
  @IsOptional()
  @IsObject()
  globalVariables?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Network configurations', type: [Object] })
  @IsOptional()
  @IsArray()
  networkConfigs?: Record<string, any>[];

  @ApiPropertyOptional({ description: 'Authentication configuration' })
  @IsOptional()
  @IsObject()
  authentication?: Record<string, any>;

  @ApiProperty({ description: 'Internationalization configuration' })
  @IsObject()
  internationalization: Record<string, any>;

  @ApiProperty({ description: 'Server-side rendering enabled', example: false })
  @IsBoolean()
  ssr: boolean;

  @ApiPropertyOptional({ description: 'Application queries/tasks', type: [Object] })
  @IsOptional()
  @IsArray()
  querys?: Record<string, any>[];

  @ApiProperty({ description: 'Application version', example: '1.0.0' })
  @IsString()
  version: string;

  @ApiProperty({ description: 'Version control provider', example: 'git' })
  @IsString()
  versionControlProvider: string;

  @ApiProperty({ description: 'Version control token' })
  @IsString()
  versionControlToken: string;

  @ApiProperty({ description: 'Repository URL', example: 'https://github.com/user/repo.git' })
  @IsString()
  repositoryUrl: string;

  @ApiPropertyOptional({ description: 'Application description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Application tags', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ description: 'Application status', example: 'active' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ description: 'Created by user ID' })
  @IsOptional()
  @IsString()
  createdBy?: string;
}
