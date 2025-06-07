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
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {

    return this.userModel.findOne({ _id: id }).exec();
  }

  async create(userData: Partial<User>): Promise<UserDocument> {
    const user = new this.userModel({
      ...userData
    });
    return user.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find({  }).exec();
  }

  async update(id: string, updateData: Partial<User>): Promise<UserDocument | null> {

    return this.userModel.findOneAndUpdate(
      { _id: id },
      updateData,
      { new: true }
    ).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }
}
