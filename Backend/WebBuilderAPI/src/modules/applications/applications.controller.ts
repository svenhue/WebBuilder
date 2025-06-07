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

  @Get('stats')
  @ApiOperation({ summary: 'Get application statistics' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  getStats() {
    return this.applicationsService.getApplicationStats();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search applications by name' })
  @ApiQuery({ name: 'name', description: 'Application name to search for' })
  @ApiResponse({ status: 200, description: 'Applications found' })
  searchByName(@Query('name') name: string) {
    return this.applicationsService.findByName(name);
  }

  @Get('by-status/:status')
  @ApiOperation({ summary: 'Get applications by status' })
  @ApiResponse({ status: 200, description: 'Applications retrieved successfully' })
  findByStatus(@Param('status') status: string) {
    return this.applicationsService.findByStatus(status);
  }

  @Get('by-tags')
  @ApiOperation({ summary: 'Get applications by tags' })
  @ApiQuery({ name: 'tags', description: 'Comma-separated list of tags' })
  @ApiResponse({ status: 200, description: 'Applications retrieved successfully' })
  findByTags(@Query('tags') tags: string) {
    const tagArray = tags.split(',').map(tag => tag.trim());
    return this.applicationsService.findByTags(tagArray);
  }

  @Get('app/:id')
  @ApiOperation({ summary: 'Get application by application ID' })
  @ApiResponse({ status: 200, description: 'Application retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Application not found' })
  findByApplicationId(@Param('id') id: string) {
    return this.applicationsService.findByApplicationId(parseInt(id));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get application by MongoDB ID' })
  @ApiResponse({ status: 200, description: 'Application retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Application not found' })
  findOne(@Param('id') id: string) {
    return this.applicationsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update application' })
  @ApiResponse({ status: 200, description: 'Application updated successfully' })
  @ApiResponse({ status: 404, description: 'Application not found' })
  update(@Param('id') id: string, @Body() updateApplicationDto: UpdateApplicationDto) {
    return this.applicationsService.update(id, updateApplicationDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update application status' })
  @ApiResponse({ status: 200, description: 'Application status updated successfully' })
  @ApiResponse({ status: 404, description: 'Application not found' })
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.applicationsService.updateStatus(id, status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete application' })
  @ApiResponse({ status: 200, description: 'Application deleted successfully' })
  @ApiResponse({ status: 404, description: 'Application not found' })
  remove(@Param('id') id: string) {
    return this.applicationsService.remove(id);
  }

  // Page Configuration Management
  @Get(':id/pages')
  @ApiOperation({ summary: 'Get all pages for an application' })
  @ApiResponse({ status: 200, description: 'Pages retrieved successfully' })
  getApplicationPages(@Param('id') id: string) {
    return this.applicationsService.getApplicationPages(id);
  }

  @Post(':id/pages')
  @ApiOperation({ summary: 'Add a page to an application' })
  @ApiResponse({ status: 201, description: 'Page added successfully' })
  addPageToApplication(@Param('id') id: string, @Body() pageConfig: any) {
    return this.applicationsService.addPageToApplication(id, pageConfig);
  }

  @Put(':id/pages/:pageId')
  @ApiOperation({ summary: 'Update a page in an application' })
  @ApiResponse({ status: 200, description: 'Page updated successfully' })
  updateApplicationPage(@Param('id') id: string, @Param('pageId') pageId: string, @Body() pageConfig: any) {
    return this.applicationsService.updateApplicationPage(id, pageId, pageConfig);
  }

  @Delete(':id/pages/:pageId')
  @ApiOperation({ summary: 'Remove a page from an application' })
  @ApiResponse({ status: 200, description: 'Page removed successfully' })
  removePageFromApplication(@Param('id') id: string, @Param('pageId') pageId: string) {
    return this.applicationsService.removePageFromApplication(id, pageId);
  }

  // View Configuration Management
  @Get(':id/pages/:pageId/views')
  @ApiOperation({ summary: 'Get all views for a page' })
  @ApiResponse({ status: 200, description: 'Views retrieved successfully' })
  getPageViews(@Param('id') id: string, @Param('pageId') pageId: string) {
    return this.applicationsService.getPageViews(id, pageId);
  }

  @Post(':id/pages/:pageId/views')
  @ApiOperation({ summary: 'Add a view to a page' })
  @ApiResponse({ status: 201, description: 'View added successfully' })
  addViewToPage(@Param('id') id: string, @Param('pageId') pageId: string, @Body() viewConfig: any) {
    return this.applicationsService.addViewToPage(id, pageId, viewConfig);
  }

  @Put(':id/pages/:pageId/views/:viewId')
  @ApiOperation({ summary: 'Update a view in a page' })
  @ApiResponse({ status: 200, description: 'View updated successfully' })
  updatePageView(@Param('id') id: string, @Param('pageId') pageId: string, @Param('viewId') viewId: string, @Body() viewConfig: any) {
    return this.applicationsService.updatePageView(id, pageId, viewId, viewConfig);
  }

  @Delete(':id/pages/:pageId/views/:viewId')
  @ApiOperation({ summary: 'Remove a view from a page' })
  @ApiResponse({ status: 200, description: 'View removed successfully' })
  removeViewFromPage(@Param('id') id: string, @Param('pageId') pageId: string, @Param('viewId') viewId: string) {
    return this.applicationsService.removeViewFromPage(id, pageId, viewId);
  }

  // Direct View Configuration Management (for root component views)
  @Get(':id/views')
  @ApiOperation({ summary: 'Get all views for an application' })
  @ApiResponse({ status: 200, description: 'Views retrieved successfully' })
  getApplicationViews(@Param('id') id: string) {
    return this.applicationsService.getApplicationViews(id);
  }

  @Post(':id/views')
  @ApiOperation({ summary: 'Add a view to an application' })
  @ApiResponse({ status: 201, description: 'View added successfully' })
  addViewToApplication(@Param('id') id: string, @Body() viewConfig: any) {
    return this.applicationsService.addViewToApplication(id, viewConfig);
  }

  @Put(':id/views/:viewId')
  @ApiOperation({ summary: 'Update a view in an application' })
  @ApiResponse({ status: 200, description: 'View updated successfully' })
  updateApplicationView(@Param('id') id: string, @Param('viewId') viewId: string, @Body() viewConfig: any) {
    return this.applicationsService.updateApplicationView(id, viewId, viewConfig);
  }

  @Delete(':id/views/:viewId')
  @ApiOperation({ summary: 'Remove a view from an application' })
  @ApiResponse({ status: 200, description: 'View removed successfully' })
  removeViewFromApplication(@Param('id') id: string, @Param('viewId') viewId: string) {
    return this.applicationsService.removeViewFromApplication(id, viewId);
  }
}
