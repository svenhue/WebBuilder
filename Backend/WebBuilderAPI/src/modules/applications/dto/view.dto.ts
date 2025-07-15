// dtos/view-configuration.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsObject, IsArray, isString, IsBoolean } from 'class-validator';


class ViewChildren {
  @ApiProperty({ example: 'childrenCollection' })
  @IsString()
  type: string;

  @ApiProperty({ example: [5, 16] })
  @IsArray()
  value: any[];
}
export class ViewConfigurationDto {
  @ApiProperty({ description: 'ID or name of the view', example: 'mainView' })
  @IsString()
  id: string;

  @ApiPropertyOptional({ description: 'Type of the view (e.g. layout, form, list)', example: 'layout' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ description: 'Type of the view (e.g. layout, form, list)', example: 'layout' })
  @IsOptional()
  @IsString()
  publicidentifier?: string;

  @ApiPropertyOptional({ description: 'Type of the view (e.g. layout, form, list)', example: 'layout' })
  @IsOptional()
  htmlattributes?: Object;

  @ApiPropertyOptional({ description: 'Type of the view (e.g. layout, form, list)', example: 'layout' })
  @IsOptional()
  dataConfig?: Object;

  @ApiPropertyOptional({ description: 'Type of the view (e.g. layout, form, list)', example: 'layout' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ required: true })
  @IsString()
  tag: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  icon: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isRoot?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  parentId?: number;

  @ApiProperty({ required: true })
  @IsOptional()
  contextid?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  position?: number;

  @ApiPropertyOptional({ description: 'Metadata or layout configuration', example: { cols: 12, responsive: true } })
  @IsOptional()
  @IsObject()
  config?: Record<string, any>;

  @IsOptional()
@IsArray()
@ApiPropertyOptional({ type: [ViewChildren] })
children?: ViewChildren[];
}
