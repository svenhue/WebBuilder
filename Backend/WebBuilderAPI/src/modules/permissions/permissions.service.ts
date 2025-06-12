import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PermissionGrant, PermissionGrantDocument, GrantType, PermissionAction, ResourceType } from './schemas/permission.grant.schema';
import { Permission, PermissionDocument } from './schemas/permission.schema';
import { PermissionGroup } from './schemas/permission.groups.schema';
import { Role } from './schemas/role.schema';

export interface PermissionCheckRequest {
  grantId: string;
  grantType: GrantType;
  resourceType: ResourceType;
  resourceId: string;
  action: PermissionAction;
}

export interface CreatePermissionGrantRequest {
  permissionId: string;
  grantId: string;
  grantType: GrantType;
  resourceType: ResourceType;
  resourceId: string;
  action: PermissionAction;
  isActive?: boolean;
  expiresAt?: Date;
  conditions?: Record<string, any>;
  priority?: number;
  source?: string;
  grantedBy?: string;
  reason?: string;
}

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(PermissionGrant.name) private permissionGrantModel: Model<PermissionGrantDocument>,
    @InjectModel(Permission.name) private permissionModel: Model<PermissionDocument>,
    @InjectModel(PermissionGroup.name) private permissionGroupModel: Model<PermissionGroup>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
  ) {}

  // ===== PERMISSION GRANT CRUD METHODS =====
  
  async createPermissionGrant(data: CreatePermissionGrantRequest): Promise<PermissionGrant> {
    const permissionGrant = new this.permissionGrantModel(data);
    return await permissionGrant.save();
  }

  async findAllPermissionGrants(filter: any = {}): Promise<PermissionGrant[]> {
    return await this.permissionGrantModel.find(filter).exec();
  }

  async findPermissionGrantById(id: string): Promise<PermissionGrant> {
    const permissionGrant = await this.permissionGrantModel.findById(id).exec();
    if (!permissionGrant) {
      throw new NotFoundException(`Permission grant with ID ${id} not found`);
    }
    return permissionGrant;
  }

  async updatePermissionGrant(id: string, updateData: Partial<CreatePermissionGrantRequest>): Promise<PermissionGrant> {
    const updatedPermissionGrant = await this.permissionGrantModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    
    if (!updatedPermissionGrant) {
      throw new NotFoundException(`Permission grant with ID ${id} not found`);
    }
    return updatedPermissionGrant;
  }

  async deletePermissionGrant(id: string): Promise<void> {
    const result = await this.permissionGrantModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Permission grant with ID ${id} not found`);
    }
  }

  // ===== PERMISSION CRUD METHODS =====

  async createPermission(data: {
    name: string;
    parentName: string;
    displayName: string;
    isEnabled: boolean;
    groupName: string;
  }): Promise<Permission> {
    const permission = new this.permissionModel(data);
    return await permission.save();
  }

  async findAllPermissions(filter: any = {}): Promise<Permission[]> {
    return await this.permissionModel.find(filter).exec();
  }

  async findPermissionById(id: string): Promise<Permission> {
    const permission = await this.permissionModel.findById(id).exec();
    if (!permission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }
    return permission;
  }

  async updatePermission(id: string, updateData: Partial<{
    name: string;
    parentName: string;
    displayName: string;
    isEnabled: boolean;
    groupName: string;
  }>): Promise<Permission> {
    const updatedPermission = await this.permissionModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    
    if (!updatedPermission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }
    return updatedPermission;
  }

  async deletePermission(id: string): Promise<void> {
    const result = await this.permissionModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }
  }

  // ===== PERMISSION GROUP CRUD METHODS =====

  async createPermissionGroup(data: {
    name: string;
    displayName: string;
  }): Promise<PermissionGroup> {
    const permissionGroup = new this.permissionGroupModel(data);
    return await permissionGroup.save();
  }

  async findAllPermissionGroups(filter: any = {}): Promise<PermissionGroup[]> {
    return await this.permissionGroupModel.find(filter).exec();
  }

  async findPermissionGroupById(id: string): Promise<PermissionGroup> {
    const permissionGroup = await this.permissionGroupModel.findById(id).exec();
    if (!permissionGroup) {
      throw new NotFoundException(`Permission group with ID ${id} not found`);
    }
    return permissionGroup;
  }

  async updatePermissionGroup(id: string, updateData: Partial<{
    name: string;
    displayName: string;
  }>): Promise<PermissionGroup> {
    const updatedPermissionGroup = await this.permissionGroupModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    
    if (!updatedPermissionGroup) {
      throw new NotFoundException(`Permission group with ID ${id} not found`);
    }
    return updatedPermissionGroup;
  }

  async deletePermissionGroup(id: string): Promise<void> {
    const result = await this.permissionGroupModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Permission group with ID ${id} not found`);
    }
  }

  // ===== ROLE CRUD METHODS =====

  async createRole(data: {
    name: string;
    displayName: string;
    normalizedName: string;
    isDefault: boolean;
    isPublic: boolean;
  }): Promise<Role> {
    const role = new this.roleModel(data);
    return await role.save();
  }

  async findAllRoles(filter: any = {}): Promise<Role[]> {
    return await this.roleModel.find(filter).exec();
  }

  async findRoleById(id: string): Promise<Role> {
    const role = await this.roleModel.findById(id).exec();
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return role;
  }

  async updateRole(id: string, updateData: Partial<{
    name: string;
    displayName: string;
    normalizedName: string;
    isDefault: boolean;
    isPublic: boolean;
  }>): Promise<Role> {
    const updatedRole = await this.roleModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    
    if (!updatedRole) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return updatedRole;
  }

  async deleteRole(id: string): Promise<void> {
    const result = await this.roleModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
  }

  // ===== ADDITIONAL UTILITY METHODS =====

  async findPermissionsByGroup(groupName: string): Promise<Permission[]> {
    return await this.permissionModel.find({ groupName }).exec();
  }

  async findRolesByName(name: string): Promise<Role[]> {
    return await this.roleModel.find({ name: new RegExp(name, 'i') }).exec();
  }

  async findDefaultRoles(): Promise<Role[]> {
    return await this.roleModel.find({ isDefault: true }).exec();
  }

  async findPublicRoles(): Promise<Role[]> {
    return await this.roleModel.find({ isPublic: true }).exec();
  }
}
