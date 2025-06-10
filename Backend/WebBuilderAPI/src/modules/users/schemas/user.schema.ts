import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { AuditableSchema } from '../../../shared/database/auditing/schemas/auditable.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User extends AuditableSchema {
  @ApiProperty({ description: 'User email address', example: 'user@example.com' })
  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @ApiProperty({ description: 'User password (hashed)', example: 'hashedPassword123' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ description: 'User first name', example: 'John' })
  @Prop({ required: false })
  firstName: string;

  @ApiProperty({ description: 'User last name', example: 'Doe' })
  @Prop({ required: false })
  lastName: string;


  @ApiProperty({ description: 'User tenant ID', example: 'tenant1' })
  @Prop({ required: false })
  tenantId: string;

  @ApiProperty({ description: 'Whether user is active', example: true })
  @Prop({ default: false })
  isActive: boolean;

  @ApiProperty({ description: 'Whether user email is verified', example: false })
  @Prop({ default: false })
  isEmailVerified: boolean;

  @ApiProperty({ description: 'User phone number', example: '+1234567890' })
  @Prop()
  phoneNumber?: string;


  @ApiProperty({ description: 'Last login timestamp' })
  @Prop()
  lastLoginAt?: Date;

  @ApiProperty({ description: 'Password reset token' })
  @Prop()
  passwordResetToken?: string;

  @ApiProperty({ description: 'Password reset token expiry' })
  @Prop()
  passwordResetExpires?: Date;

  @ApiProperty({ description: 'Email verification token' })
  @Prop()
  emailVerificationToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Create compound index for tenant isolation
UserSchema.index({ tenantId: 1, email: 1 }, { unique: true });
UserSchema.index({ tenantId: 1, isActive: 1 });
UserSchema.index({ passwordResetToken: 1 });
UserSchema.index({ emailVerificationToken: 1 });
