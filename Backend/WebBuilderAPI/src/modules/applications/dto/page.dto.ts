// dtos/page-configuration.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ViewConfigurationDto } from './view.dto';

export class PageConfigurationDto {
  @ApiProperty({ description: 'Unique identifier for the page', example: 'home' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Display name of the page', example: 'Home Page' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Optional route path', example: '/home' })
  @IsOptional()
  @IsString()
  path?: string;

  @ApiPropertyOptional({ description: 'Optional route role', example: 'Landingpage' })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiPropertyOptional({ description: 'List of view configurations', type: [ViewConfigurationDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ViewConfigurationDto)
  views?: ViewConfigurationDto[];
}
