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
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { TenantInterceptor } from '../../shared/tenancy/tenant.interceptor';

@ApiTags('Applications')
@ApiBearerAuth()
@Controller('applications')
@UseInterceptors(TenantInterceptor)
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new application' })
  @ApiResponse({ status: 201, description: 'Application created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationsService.create(createApplicationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all applications' })
  @ApiResponse({ status: 200, description: 'Applications retrieved successfully' })
  findAll() {
    return this.applicationsService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search applications by name' })
  @ApiQuery({ name: 'name', description: 'Application name to search for' })
  @ApiResponse({ status: 200, description: 'Applications found' })
  searchByName(@Query('name') name: string) {
    return this.applicationsService.findByName(name);
  }
  
  @Get('app/:id')
  @ApiOperation({ summary: 'Get application by application ID' })
  @ApiResponse({ status: 200, description: 'Application retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Application not found' })
  findByApplicationId(@Param('id') id: string) {
    return this.applicationsService.findByApplicationId(parseInt(id));
  }


  @Patch(':id')
  @ApiOperation({ summary: 'Update application' })
  @ApiResponse({ status: 200, description: 'Application updated successfully' })
  @ApiResponse({ status: 404, description: 'Application not found' })
  update(@Param('id') id: string, @Body() updateApplicationDto: UpdateApplicationDto) {
    return this.applicationsService.update(id, updateApplicationDto);
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Delete application' })
  @ApiResponse({ status: 200, description: 'Application deleted successfully' })
  @ApiResponse({ status: 404, description: 'Application not found' })
  remove(@Param('id') id: string) {
    return this.applicationsService.remove(id);
  }

}
