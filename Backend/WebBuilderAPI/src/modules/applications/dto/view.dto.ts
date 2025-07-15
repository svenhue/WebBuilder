// dtos/view-configuration.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsObject, IsArray, isString, IsBoolean } from 'class-validator';

export class ViewConfigurationDto {
  @ApiProperty({ description: 'ID or name of the view', example: 'mainView' })
  @IsString()
  id: string;

  @ApiPropertyOptional({ description: 'Type of the view (e.g. layout, form, list)', example: 'layout' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ required: true })
  @IsString()
  tag: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  isRoot: boolean;

  @ApiPropertyOptional({ description: 'Metadata or layout configuration', example: { cols: 12, responsive: true } })
  @IsOptional()
  @IsObject()
  config?: Record<string, any>;

  @ApiPropertyOptional({ description: 'UI elements or child components', type: [Object] })
  @IsOptional()
  @IsArray()
  children?: Record<string, any>[];
}
