import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { TenancyService } from '../../shared/tenancy/tenancy.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private tenancyService: TenancyService,
  ) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    const tenantId = this.tenancyService.getTenantId();
    return this.userModel.findOne({ email, tenantId }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    const tenantId = this.tenancyService.getTenantId();
    return this.userModel.findOne({ _id: id, tenantId }).exec();
  }

  async create(userData: Partial<User>): Promise<UserDocument> {
    const tenantId = this.tenancyService.getTenantId();
    const user = new this.userModel({
      ...userData,
      tenantId,
    });
    return user.save();
  }

  async findAll(): Promise<UserDocument[]> {
    const tenantId = this.tenancyService.getTenantId();
    return this.userModel.find({ tenantId }).exec();
  }

  async update(id: string, updateData: Partial<User>): Promise<UserDocument | null> {
    const tenantId = this.tenancyService.getTenantId();
    return this.userModel.findOneAndUpdate(
      { _id: id, tenantId },
      updateData,
      { new: true }
    ).exec();
  }

  async delete(id: string): Promise<boolean> {
    const tenantId = this.tenancyService.getTenantId();
    const result = await this.userModel.deleteOne({ _id: id, tenantId }).exec();
    return result.deletedCount > 0;
  }
}
