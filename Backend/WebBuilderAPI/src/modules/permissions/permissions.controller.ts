import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { PermissionsService } from './permissions.service';
import { PermissionGrant } from './schemas/permission.grant.schema';
import { Permission } from './schemas/permission.schema';
import { PermissionGroup } from './schemas/permission.groups.schema';
import { Role } from './schemas/role.schema';
import { CreatePermissionGrantDto } from './dto/create-permission-grant.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { CreatePermissionGroupDto } from './dto/create-permission-group.dto';
import { CreateRoleDto } from './dto/create-role.dto';

@ApiTags('permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  // ===== PERMISSION GRANT ENDPOINTS =====

  @Post('grants')
  @ApiOperation({ summary: 'Create a new permission grant' })
  @ApiResponse({ status: 201, description: 'Permission grant created successfully', type: PermissionGrant })
  async createPermissionGrant(@Body() createPermissionGrantDto: CreatePermissionGrantDto): Promise<PermissionGrant> {
    return this.permissionsService.createPermissionGrant(createPermissionGrantDto);
  }

  @Get('grants')
  @ApiOperation({ summary: 'Get all permission grants' })
  @ApiQuery({ name: 'grantType', required: false, description: 'Filter by grant type' })
  @ApiQuery({ name: 'resourceType', required: false, description: 'Filter by resource type' })
  @ApiQuery({ name: 'isActive', required: false, description: 'Filter by active status' })
  @ApiResponse({ status: 200, description: 'List of permission grants', type: [PermissionGrant] })
  async findAllPermissionGrants(
    @Query('grantType') grantType?: string,
    @Query('resourceType') resourceType?: string,
    @Query('isActive') isActive?: boolean
  ): Promise<PermissionGrant[]> {
    const filter: any = {};
    if (grantType) filter.grantType = grantType;
    if (resourceType) filter.resourceType = resourceType;
    if (isActive !== undefined) filter.isActive = isActive;
    
    return this.permissionsService.findAllPermissionGrants(filter);
  }

  @Get('grants/:id')
  @ApiOperation({ summary: 'Get permission grant by ID' })
  @ApiParam({ name: 'id', description: 'Permission grant ID' })
  @ApiResponse({ status: 200, description: 'Permission grant found', type: PermissionGrant })
  @ApiResponse({ status: 404, description: 'Permission grant not found' })
  async findPermissionGrantById(@Param('id') id: string): Promise<PermissionGrant> {
    return this.permissionsService.findPermissionGrantById(id);
  }

  @Put('grants/:id')
  @ApiOperation({ summary: 'Update permission grant' })
  @ApiParam({ name: 'id', description: 'Permission grant ID' })
  @ApiResponse({ status: 200, description: 'Permission grant updated successfully', type: PermissionGrant })
  @ApiResponse({ status: 404, description: 'Permission grant not found' })
  async updatePermissionGrant(
    @Param('id') id: string,
    @Body() updatePermissionGrantDto: Partial<CreatePermissionGrantDto>
  ): Promise<PermissionGrant> {
    return this.permissionsService.updatePermissionGrant(id, updatePermissionGrantDto);
  }

  @Delete('grants/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete permission grant' })
  @ApiParam({ name: 'id', description: 'Permission grant ID' })
  @ApiResponse({ status: 204, description: 'Permission grant deleted successfully' })
  @ApiResponse({ status: 404, description: 'Permission grant not found' })
  async deletePermissionGrant(@Param('id') id: string): Promise<void> {
    return this.permissionsService.deletePermissionGrant(id);
  }

  // ===== PERMISSION ENDPOINTS =====

  @Post()
  @ApiOperation({ summary: 'Create a new permission' })
  @ApiResponse({ status: 201, description: 'Permission created successfully', type: Permission })
  async createPermission(@Body() createPermissionDto: CreatePermissionDto): Promise<Permission> {
    return this.permissionsService.createPermission(createPermissionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all permissions' })
  @ApiQuery({ name: 'groupName', required: false, description: 'Filter by group name' })
  @ApiQuery({ name: 'isEnabled', required: false, description: 'Filter by enabled status' })
  @ApiResponse({ status: 200, description: 'List of permissions', type: [Permission] })
  async findAllPermissions(
    @Query('groupName') groupName?: string,
    @Query('isEnabled') isEnabled?: boolean
  ): Promise<Permission[]> {
    const filter: any = {};
    if (groupName) filter.groupName = groupName;
    if (isEnabled !== undefined) filter.isEnabled = isEnabled;
    
    return this.permissionsService.findAllPermissions(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get permission by ID' })
  @ApiParam({ name: 'id', description: 'Permission ID' })
  @ApiResponse({ status: 200, description: 'Permission found', type: Permission })
  @ApiResponse({ status: 404, description: 'Permission not found' })
  async findPermissionById(@Param('id') id: string): Promise<Permission> {
    return this.permissionsService.findPermissionById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update permission' })
  @ApiParam({ name: 'id', description: 'Permission ID' })
  @ApiResponse({ status: 200, description: 'Permission updated successfully', type: Permission })
  @ApiResponse({ status: 404, description: 'Permission not found' })
  async updatePermission(
    @Param('id') id: string,
    @Body() updatePermissionDto: Partial<CreatePermissionDto>
  ): Promise<Permission> {
    return this.permissionsService.updatePermission(id, updatePermissionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete permission' })
  @ApiParam({ name: 'id', description: 'Permission ID' })
  @ApiResponse({ status: 204, description: 'Permission deleted successfully' })
  @ApiResponse({ status: 404, description: 'Permission not found' })
  async deletePermission(@Param('id') id: string): Promise<void> {
    return this.permissionsService.deletePermission(id);
  }

  // ===== PERMISSION GROUP ENDPOINTS =====

  @Post('groups')
  @ApiOperation({ summary: 'Create a new permission group' })
  @ApiResponse({ status: 201, description: 'Permission group created successfully', type: PermissionGroup })
  async createPermissionGroup(@Body() createPermissionGroupDto: CreatePermissionGroupDto): Promise<PermissionGroup> {
    return this.permissionsService.createPermissionGroup(createPermissionGroupDto);
  }

  @Get('groups')
  @ApiOperation({ summary: 'Get all permission groups' })
  @ApiResponse({ status: 200, description: 'List of permission groups', type: [PermissionGroup] })
  async findAllPermissionGroups(): Promise<PermissionGroup[]> {
    return this.permissionsService.findAllPermissionGroups();
  }

  @Get('groups/:id')
  @ApiOperation({ summary: 'Get permission group by ID' })
  @ApiParam({ name: 'id', description: 'Permission group ID' })
  @ApiResponse({ status: 200, description: 'Permission group found', type: PermissionGroup })
  @ApiResponse({ status: 404, description: 'Permission group not found' })
  async findPermissionGroupById(@Param('id') id: string): Promise<PermissionGroup> {
    return this.permissionsService.findPermissionGroupById(id);
  }

  @Put('groups/:id')
  @ApiOperation({ summary: 'Update permission group' })
  @ApiParam({ name: 'id', description: 'Permission group ID' })
  @ApiResponse({ status: 200, description: 'Permission group updated successfully', type: PermissionGroup })
  @ApiResponse({ status: 404, description: 'Permission group not found' })
  async updatePermissionGroup(
    @Param('id') id: string,
    @Body() updatePermissionGroupDto: Partial<CreatePermissionGroupDto>
  ): Promise<PermissionGroup> {
    return this.permissionsService.updatePermissionGroup(id, updatePermissionGroupDto);
  }

  @Delete('groups/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete permission group' })
  @ApiParam({ name: 'id', description: 'Permission group ID' })
  @ApiResponse({ status: 204, description: 'Permission group deleted successfully' })
  @ApiResponse({ status: 404, description: 'Permission group not found' })
  async deletePermissionGroup(@Param('id') id: string): Promise<void> {
    return this.permissionsService.deletePermissionGroup(id);
  }

  // ===== ROLE ENDPOINTS =====

  @Post('roles')
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({ status: 201, description: 'Role created successfully', type: Role })
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.permissionsService.createRole(createRoleDto);
  }

  @Get('roles')
  @ApiOperation({ summary: 'Get all roles' })
  @ApiQuery({ name: 'isDefault', required: false, description: 'Filter by default status' })
  @ApiQuery({ name: 'isPublic', required: false, description: 'Filter by public status' })
  @ApiResponse({ status: 200, description: 'List of roles', type: [Role] })
  async findAllRoles(
    @Query('isDefault') isDefault?: boolean,
    @Query('isPublic') isPublic?: boolean
  ): Promise<Role[]> {
    const filter: any = {};
    if (isDefault !== undefined) filter.isDefault = isDefault;
    if (isPublic !== undefined) filter.isPublic = isPublic;
    
    return this.permissionsService.findAllRoles(filter);
  }

  @Get('roles/:id')
  @ApiOperation({ summary: 'Get role by ID' })
  @ApiParam({ name: 'id', description: 'Role ID' })
  @ApiResponse({ status: 200, description: 'Role found', type: Role })
  @ApiResponse({ status: 404, description: 'Role not found' })
  async findRoleById(@Param('id') id: string): Promise<Role> {
    return this.permissionsService.findRoleById(id);
  }

  @Put('roles/:id')
  @ApiOperation({ summary: 'Update role' })
  @ApiParam({ name: 'id', description: 'Role ID' })
  @ApiResponse({ status: 200, description: 'Role updated successfully', type: Role })
  @ApiResponse({ status: 404, description: 'Role not found' })
  async updateRole(
    @Param('id') id: string,
    @Body() updateRoleDto: Partial<CreateRoleDto>
  ): Promise<Role> {
    return this.permissionsService.updateRole(id, updateRoleDto);
  }

  @Delete('roles/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete role' })
  @ApiParam({ name: 'id', description: 'Role ID' })
  @ApiResponse({ status: 204, description: 'Role deleted successfully' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  async deleteRole(@Param('id') id: string): Promise<void> {
    return this.permissionsService.deleteRole(id);
  }

  // ===== UTILITY ENDPOINTS =====

  @Get('by-group/:groupName')
  @ApiOperation({ summary: 'Get permissions by group name' })
  @ApiParam({ name: 'groupName', description: 'Group name' })
  @ApiResponse({ status: 200, description: 'List of permissions in the group', type: [Permission] })
  async findPermissionsByGroup(@Param('groupName') groupName: string): Promise<Permission[]> {
    return this.permissionsService.findPermissionsByGroup(groupName);
  }

  @Get('roles/search/:name')
  @ApiOperation({ summary: 'Search roles by name' })
  @ApiParam({ name: 'name', description: 'Role name to search for' })
  @ApiResponse({ status: 200, description: 'List of matching roles', type: [Role] })
  async findRolesByName(@Param('name') name: string): Promise<Role[]> {
    return this.permissionsService.findRolesByName(name);
  }

  @Get('roles/default')
  @ApiOperation({ summary: 'Get all default roles' })
  @ApiResponse({ status: 200, description: 'List of default roles', type: [Role] })
  async findDefaultRoles(): Promise<Role[]> {
    return this.permissionsService.findDefaultRoles();
  }

  @Get('roles/public')
  @ApiOperation({ summary: 'Get all public roles' })
  @ApiResponse({ status: 200, description: 'List of public roles', type: [Role] })
  async findPublicRoles(): Promise<Role[]> {
    return this.permissionsService.findPublicRoles();
  }
}
