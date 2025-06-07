import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Application, ApplicationDocument } from './schemas/application.schema';
import { TenancyService } from '../../shared/tenancy/tenancy.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Application.name) private applicationModel: Model<ApplicationDocument>,
    private tenancyService: TenancyService,
  ) {}

  async create(createApplicationDto: CreateApplicationDto): Promise<ApplicationDocument> {
    const tenantId = this.tenancyService.getTenantId();
    const application = new this.applicationModel({
      ...createApplicationDto,
      tenantId,
    });
    return application.save();
  }

  async findAll(): Promise<ApplicationDocument[]> {
    const tenantId = this.tenancyService.getTenantId();
    return this.applicationModel.find({ tenantId }).exec();
  }

  async findOne(id: string): Promise<ApplicationDocument> {
    const tenantId = this.tenancyService.getTenantId();
    const application = await this.applicationModel.findOne({ _id: id, tenantId }).exec();
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    return application;
  }

  async findByApplicationId(applicationId: number): Promise<ApplicationDocument> {
    const tenantId = this.tenancyService.getTenantId();
    const application = await this.applicationModel.findOne({ id: applicationId, tenantId }).exec();
    if (!application) {
      throw new NotFoundException(`Application with ID ${applicationId} not found`);
    }
    return application;
  }

  async update(id: string, updateApplicationDto: UpdateApplicationDto): Promise<ApplicationDocument> {
    const tenantId = this.tenancyService.getTenantId();
    const application = await this.applicationModel.findOneAndUpdate(
      { _id: id, tenantId },
      updateApplicationDto,
      { new: true }
    ).exec();
    
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    return application;
  }

  async remove(id: string): Promise<void> {
    const tenantId = this.tenancyService.getTenantId();
    const result = await this.applicationModel.deleteOne({ _id: id, tenantId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
  }

  async findByName(name: string): Promise<ApplicationDocument[]> {
    const tenantId = this.tenancyService.getTenantId();
    return this.applicationModel.find({ 
      name: { $regex: name, $options: 'i' }, 
      tenantId 
    }).exec();
  }

  async findByStatus(status: string): Promise<ApplicationDocument[]> {
    const tenantId = this.tenancyService.getTenantId();
    return this.applicationModel.find({ status, tenantId }).exec();
  }

  async findByTags(tags: string[]): Promise<ApplicationDocument[]> {
    const tenantId = this.tenancyService.getTenantId();
    return this.applicationModel.find({ 
      tags: { $in: tags }, 
      tenantId 
    }).exec();
  }

  async updateStatus(id: string, status: string): Promise<ApplicationDocument> {
    const tenantId = this.tenancyService.getTenantId();
    const application = await this.applicationModel.findOneAndUpdate(
      { _id: id, tenantId },
      { status },
      { new: true }
    ).exec();
    
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    return application;
  }

  async getApplicationStats(): Promise<any> {
    const tenantId = this.tenancyService.getTenantId();
    const stats = await this.applicationModel.aggregate([
      { $match: { tenantId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]).exec();

    const total = await this.applicationModel.countDocuments({ tenantId }).exec();
    
    return {
      total,
      byStatus: stats.reduce((acc, stat) => {
        acc[stat._id] = stat.count;
        return acc;
      }, {})
    };
  }

  // Page Configuration Management
  async getApplicationPages(id: string): Promise<any[]> {
    const application = await this.findOne(id);
    return application.pages || [];
  }

  async addPageToApplication(id: string, pageConfig: any): Promise<ApplicationDocument> {
    const tenantId = this.tenancyService.getTenantId();
    const application = await this.applicationModel.findOneAndUpdate(
      { _id: id, tenantId },
      { $push: { pages: { ...pageConfig, id: Date.now() } } },
      { new: true }
    ).exec();
    
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    return application;
  }

  async updateApplicationPage(id: string, pageId: string, pageConfig: any): Promise<ApplicationDocument> {
    const tenantId = this.tenancyService.getTenantId();
    const application = await this.applicationModel.findOneAndUpdate(
      { _id: id, tenantId, 'pages.id': parseInt(pageId) },
      { $set: { 'pages.$': { ...pageConfig, id: parseInt(pageId) } } },
      { new: true }
    ).exec();
    
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} or page with ID ${pageId} not found`);
    }
    return application;
  }

  async removePageFromApplication(id: string, pageId: string): Promise<ApplicationDocument> {
    const tenantId = this.tenancyService.getTenantId();
    const application = await this.applicationModel.findOneAndUpdate(
      { _id: id, tenantId },
      { $pull: { pages: { id: parseInt(pageId) } } },
      { new: true }
    ).exec();
    
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    return application;
  }

  // View Configuration Management for Pages
  async getPageViews(id: string, pageId: string): Promise<any[]> {
    const application = await this.findOne(id);
    const page = application.pages?.find(p => p.id === parseInt(pageId));
    if (!page) {
      throw new NotFoundException(`Page with ID ${pageId} not found`);
    }
    return page.views || [];
  }

  async addViewToPage(id: string, pageId: string, viewConfig: any): Promise<ApplicationDocument> {
    const tenantId = this.tenancyService.getTenantId();
    const application = await this.applicationModel.findOneAndUpdate(
      { _id: id, tenantId, 'pages.id': parseInt(pageId) },
      { $push: { 'pages.$.views': { ...viewConfig, id: Date.now() } } },
      { new: true }
    ).exec();
    
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} or page with ID ${pageId} not found`);
    }
    return application;
  }

  async updatePageView(id: string, pageId: string, viewId: string, viewConfig: any): Promise<ApplicationDocument> {
    const tenantId = this.tenancyService.getTenantId();
    
    // First find the application and page
    const application = await this.findOne(id);
    const pageIndex = application.pages?.findIndex(p => p.id === parseInt(pageId));
    
    if (pageIndex === -1 || pageIndex === undefined) {
      throw new NotFoundException(`Page with ID ${pageId} not found`);
    }
    
    const viewIndex = application.pages[pageIndex].views?.findIndex(v => v.id === parseInt(viewId));
    if (viewIndex === -1 || viewIndex === undefined) {
      throw new NotFoundException(`View with ID ${viewId} not found`);
    }
    
    // Update the specific view
    const updatePath = `pages.${pageIndex}.views.${viewIndex}`;
    const updatedApplication = await this.applicationModel.findOneAndUpdate(
      { _id: id, tenantId },
      { $set: { [updatePath]: { ...viewConfig, id: parseInt(viewId) } } },
      { new: true }
    ).exec();
    
    if (!updatedApplication) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    return updatedApplication;
  }

  async removeViewFromPage(id: string, pageId: string, viewId: string): Promise<ApplicationDocument> {
    const tenantId = this.tenancyService.getTenantId();
    const application = await this.applicationModel.findOneAndUpdate(
      { _id: id, tenantId, 'pages.id': parseInt(pageId) },
      { $pull: { 'pages.$.views': { id: parseInt(viewId) } } },
      { new: true }
    ).exec();
    
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} or page with ID ${pageId} not found`);
    }
    return application;
  }

  // Direct View Configuration Management (for root component)
  async getApplicationViews(id: string): Promise<any> {
    const application = await this.findOne(id);
    return application.rootComponent || {};
  }

  async addViewToApplication(id: string, viewConfig: any): Promise<ApplicationDocument> {
    const tenantId = this.tenancyService.getTenantId();
    
    // Add view to root component's children array
    const application = await this.applicationModel.findOneAndUpdate(
      { _id: id, tenantId },
      { 
        $push: { 
          'rootComponent.children': { ...viewConfig, id: Date.now() } 
        }
      },
      { new: true }
    ).exec();
    
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    return application;
  }

  async updateApplicationView(id: string, viewId: string, viewConfig: any): Promise<ApplicationDocument> {
    const tenantId = this.tenancyService.getTenantId();
    const application = await this.applicationModel.findOneAndUpdate(
      { _id: id, tenantId, 'rootComponent.children.id': parseInt(viewId) },
      { $set: { 'rootComponent.children.$': { ...viewConfig, id: parseInt(viewId) } } },
      { new: true }
    ).exec();
    
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} or view with ID ${viewId} not found`);
    }
    return application;
  }

  async removeViewFromApplication(id: string, viewId: string): Promise<ApplicationDocument> {
    const tenantId = this.tenancyService.getTenantId();
    const application = await this.applicationModel.findOneAndUpdate(
      { _id: id, tenantId },
      { $pull: { 'rootComponent.children': { id: parseInt(viewId) } } },
      { new: true }
    ).exec();
    
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    return application;
  }
}
