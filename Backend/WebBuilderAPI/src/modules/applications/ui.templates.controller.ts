import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { TenantInterceptor } from '../../shared/tenancy/tenant.interceptor';
import { TemplateDto } from './dto/template.dto';
import { UITemplatesService } from './ui.templates.service';

@ApiTags('templates')
@ApiBearerAuth()
@Controller('templates')
@UseInterceptors(TenantInterceptor)
export class TemplatesController {
  constructor(private readonly templateService: UITemplatesService) {}


    @Post()
    @ApiOperation({ summary: 'Create a new template' })
    @ApiResponse({ status: 201, description: 'Template created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async create(@Body() templateDto: TemplateDto) {
        return await this.templateService.create(templateDto);
    }


    @Patch(':id')
    @ApiOperation({ summary: 'Update template' })
    @ApiResponse({ status: 200, description: 'Tempalte updated successfully' })
    @ApiResponse({ status: 404, description: 'Template not found' })
    async update(@Param('id') id: string, @Body() templateDto: TemplateDto) {
        return await this.templateService.update(id, templateDto);
    }

}