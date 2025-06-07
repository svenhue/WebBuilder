import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Application, ApplicationDocument } from './schemas/application.schema';
import { TenancyService } from '../../shared/tenancy/tenancy.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApplicationDeploymentModes } from 'webbuilderalphautils';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Application.name) private applicationModel: Model<ApplicationDocument>,
    private tenancyService: TenancyService,
  ) {}

  async create(createApplicationDto: CreateApplicationDto): Promise<ApplicationDocument> {

    if(!createApplicationDto.version){
      createApplicationDto.version = '0.0.1'; // Default version if not provided
    }
    if(!createApplicationDto.deploymentMode){
      createApplicationDto.deploymentMode = ApplicationDeploymentModes.mpahybrid // Default mode if not provided
    }
    const application = new this.applicationModel({
      ...createApplicationDto
    });
    return application.save();
  }

  async findAll(): Promise<ApplicationDocument[]> {

    return this.applicationModel.find({  }).exec();
  }

  async findOne(id: string): Promise<ApplicationDocument> {
 
    const application = await this.applicationModel.findOne({ _id: id }).exec();
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    return application;
  }

  async findByApplicationId(applicationId: number): Promise<ApplicationDocument> {

    const application = await this.applicationModel.findOne({ id: applicationId }).exec();
    if (!application) {
      throw new NotFoundException(`Application with ID ${applicationId} not found`);
    }
    return application;
  }

  async update(id: string, updateApplicationDto: UpdateApplicationDto): Promise<ApplicationDocument> {
    const application = await this.applicationModel.findOneAndUpdate(
      { _id: id },
      updateApplicationDto,
      { new: true }
    ).exec();
    
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    return application;
  }

  async remove(id: string): Promise<void> {
 
    const result = await this.applicationModel.deleteOne({ _id: id }).exec();
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

}
