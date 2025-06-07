import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { TenancyService } from '../../shared/tenancy/tenancy.service';
import * as bcrypt from 'bcrypt';
import { NotFoundError } from 'rxjs';

@Injectable()
export class RegisterService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private tenancyService: TenancyService,
  ) {}


  public async Register(email: string, password: string): Promise<User> {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException({message:'User already exists'});
    }
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const createdUser = new this.userModel({
      email,
      password: hashedPassword,
      // ...other fields...
    });
    return createdUser.save();
  }

  public async DeleteAccount(email: string, password: string): Promise<{ deleted: boolean }> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException({message:'User not found'});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    await this.userModel.deleteOne({ email });
    return { deleted: true };
  }
}

