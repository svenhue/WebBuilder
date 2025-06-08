import { IsString, IsNumber, IsBoolean, IsOptional, IsArray, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IPageConfiguration } from 'webbuilderalphautils';

export class TemplateDto{

    @ApiProperty({ description: 'UITemplate name', example: 'My WebBuilder UITemplate' })
      @IsOptional()
      name: string;
    
      @ApiPropertyOptional({ description: 'Deployment mode', example: 'spa' })
      @IsOptional()
      deploymentMode?: string;
    
      @ApiPropertyOptional({ description: 'Page configurations', type: [Object] })
      @IsOptional()
      pages?: Array<IPageConfiguration>;
    
      @ApiPropertyOptional({ description: 'UITemplate stylesheets configuration' })
      @IsOptional()
      stylesheets?: Record<string, any>;
    
      @ApiPropertyOptional({ description: 'Internationalization configuration' })
      @IsOptional()
      internationalization?: Record<string, any>;
    
      @ApiPropertyOptional({ description: 'UITemplate queries/tasks', type: [Object] })
      @IsOptional()
      querys?: Record<string, any>[];
    
      @ApiPropertyOptional({ description: 'UITemplate version', example: '1.0.0' })
      @IsOptional()
      version: string;
    
      @ApiPropertyOptional({ description: 'UITemplate description' })
      @IsOptional()
      description?: string;
}