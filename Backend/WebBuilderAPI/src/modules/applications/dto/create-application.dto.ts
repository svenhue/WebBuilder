import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PageConfigurationDto } from './page.dto'; // Pfad ggf. anpassen

export class CreateApplicationDto {
  @ApiPropertyOptional({ description: 'Application ID', example: 1 })
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty({ description: 'Application name', example: 'My WebBuilder App' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Application mode', example: 'development' })
  @IsString()
  mode?: string;

  @ApiPropertyOptional({ description: 'Application modules', type: [Object] })
  @IsOptional()
  @IsArray()
  modules?: Record<string, any>[];

  @ApiPropertyOptional({ description: 'Deployment mode', example: 'spa' })
  @IsOptional()
  @IsString()
  deploymentMode: string;

  @ApiPropertyOptional({
    description: 'Page configurations',
    type: [PageConfigurationDto],
    default: [],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PageConfigurationDto)
  pages?: PageConfigurationDto[];

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

  @ApiPropertyOptional({ description: 'Internationalization configuration' })
  @IsOptional()
  @IsObject()
  internationalization?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Application queries/tasks', type: [Object] })
  @IsOptional()
  @IsArray()
  querys?: Record<string, any>[];

  @ApiPropertyOptional({ description: 'Application version', example: '1.0.0' })
  @IsOptional()
  @IsString()
  version?: string;

  @ApiPropertyOptional({ description: 'Repository URL', example: 'https://github.com/user/repo.git' })
  @IsOptional()
  @IsString()
  repositoryUrl?: string;

  @ApiPropertyOptional({ description: 'Application description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Application tags', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
