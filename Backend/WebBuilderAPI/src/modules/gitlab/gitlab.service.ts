import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { GitlabRepository, GitlabRepositoryDocument } from './schemas/gitlab-repository.schema';
import { GitlabUser, GitlabUserDocument } from './schemas/gitlab-user.schema';
import { GitlabPipeline, GitlabPipelineDocument } from './schemas/gitlab-pipeline.schema';
import { TenancyService } from '../../shared/tenancy/tenancy.service';

@Injectable()
export class GitlabService {
  private readonly logger = new Logger(GitlabService.name);
  private readonly gitlabBaseUrl: string;
  private readonly gitlabToken: string;

  constructor(
    @InjectModel(GitlabRepository.name) private repositoryModel: Model<GitlabRepositoryDocument>,
    @InjectModel(GitlabUser.name) private userModel: Model<GitlabUserDocument>,
    @InjectModel(GitlabPipeline.name) private pipelineModel: Model<GitlabPipelineDocument>,
    private httpService: HttpService,
    private configService: ConfigService,
    private tenancyService: TenancyService,
  ) {
    this.gitlabBaseUrl = this.configService.get<string>('GITLAB_BASE_URL', 'http://localhost:8080');
    this.gitlabToken = this.configService.get<string>('GITLAB_TOKEN', '');
  }

  // Repository Management
  async createRepository(createRepoData: any): Promise<GitlabRepositoryDocument> {
    const tenantId = this.tenancyService.getTenantId();
    
    try {
      // Create project in GitLab
      const gitlabProject = await this.createGitlabProject(createRepoData);
      
      // Store in local database
      const repository = new this.repositoryModel({
        ...this.mapGitlabProjectToRepository(gitlabProject),
        tenantId,
        applicationId: createRepoData.applicationId,
        createdBy: createRepoData.createdBy,
      });

      return await repository.save();
    } catch (error) {
      this.logger.error('Failed to create repository', error);
      throw new BadRequestException('Failed to create repository');
    }
  }

  async getRepositories(): Promise<GitlabRepositoryDocument[]> {
    const tenantId = this.tenancyService.getTenantId();
    return this.repositoryModel.find({ tenantId }).exec();
  }

  async getRepository(id: string): Promise<GitlabRepositoryDocument> {
    const tenantId = this.tenancyService.getTenantId();
    const repository = await this.repositoryModel.findOne({ _id: id, tenantId }).exec();
    
    if (!repository) {
      throw new NotFoundException(`Repository with ID ${id} not found`);
    }
    
    return repository;
  }

  async updateRepository(id: string, updateData: any): Promise<GitlabRepositoryDocument> {
    const tenantId = this.tenancyService.getTenantId();
    const repository = await this.repositoryModel.findOneAndUpdate(
      { _id: id, tenantId },
      updateData,
      { new: true }
    ).exec();
    
    if (!repository) {
      throw new NotFoundException(`Repository with ID ${id} not found`);
    }
    
    // Sync with GitLab if needed
    if (updateData.syncWithGitlab) {
      await this.updateGitlabProject(repository.gitlabProjectId, updateData);
    }
    
    return repository;
  }

  async deleteRepository(id: string): Promise<void> {
    const tenantId = this.tenancyService.getTenantId();
    const repository = await this.getRepository(id);
    
    // Delete from GitLab
    await this.deleteGitlabProject(repository.gitlabProjectId);
    
    // Delete from local database
    await this.repositoryModel.deleteOne({ _id: id, tenantId }).exec();
  }

  // File Management
  async getRepositoryFiles(repositoryId: string, path: string = '', ref: string = 'main'): Promise<any[]> {
    const repository = await this.getRepository(repositoryId);
    
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.gitlabBaseUrl}/api/v4/projects/${repository.gitlabProjectId}/repository/tree`,
          {
            headers: { 'PRIVATE-TOKEN': this.gitlabToken },
            params: { path, ref, recursive: false }
          }
        )
      );
      
      return response.data;
    } catch (error) {
      this.logger.error('Failed to get repository files', error);
      throw new BadRequestException('Failed to get repository files');
    }
  }

  async getFileContent(repositoryId: string, filePath: string, ref: string = 'main'): Promise<any> {
    const repository = await this.getRepository(repositoryId);
    
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.gitlabBaseUrl}/api/v4/projects/${repository.gitlabProjectId}/repository/files/${encodeURIComponent(filePath)}`,
          {
            headers: { 'PRIVATE-TOKEN': this.gitlabToken },
            params: { ref }
          }
        )
      );
      
      return {
        ...response.data,
        content: Buffer.from(response.data.content, 'base64').toString('utf-8')
      };
    } catch (error) {
      this.logger.error('Failed to get file content', error);
      throw new NotFoundException('File not found');
    }
  }

  async createOrUpdateFile(repositoryId: string, fileData: any): Promise<any> {
    const repository = await this.getRepository(repositoryId);
    
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.gitlabBaseUrl}/api/v4/projects/${repository.gitlabProjectId}/repository/files/${encodeURIComponent(fileData.file_path)}`,
          {
            branch: fileData.branch || 'main',
            content: fileData.content,
            commit_message: fileData.commit_message || 'Update file via WebBuilder',
            encoding: 'text',
            author_email: fileData.author_email,
            author_name: fileData.author_name,
          },
          {
            headers: { 'PRIVATE-TOKEN': this.gitlabToken }
          }
        )
      );
      
      return response.data;
    } catch (error) {
      // If file exists, try to update it
      if (error.response?.status === 400) {
        return this.updateFile(repositoryId, fileData);
      }
      
      this.logger.error('Failed to create file', error);
      throw new BadRequestException('Failed to create file');
    }
  }

  async updateFile(repositoryId: string, fileData: any): Promise<any> {
    const repository = await this.getRepository(repositoryId);
    
    try {
      const response = await firstValueFrom(
        this.httpService.put(
          `${this.gitlabBaseUrl}/api/v4/projects/${repository.gitlabProjectId}/repository/files/${encodeURIComponent(fileData.file_path)}`,
          {
            branch: fileData.branch || 'main',
            content: fileData.content,
            commit_message: fileData.commit_message || 'Update file via WebBuilder',
            encoding: 'text',
            author_email: fileData.author_email,
            author_name: fileData.author_name,
          },
          {
            headers: { 'PRIVATE-TOKEN': this.gitlabToken }
          }
        )
      );
      
      return response.data;
    } catch (error) {
      this.logger.error('Failed to update file', error);
      throw new BadRequestException('Failed to update file');
    }
  }

  async deleteFile(repositoryId: string, filePath: string, commitMessage: string = 'Delete file via WebBuilder'): Promise<any> {
    const repository = await this.getRepository(repositoryId);
    
    try {
      const response = await firstValueFrom(
        this.httpService.delete(
          `${this.gitlabBaseUrl}/api/v4/projects/${repository.gitlabProjectId}/repository/files/${encodeURIComponent(filePath)}`,
          {
            headers: { 'PRIVATE-TOKEN': this.gitlabToken },
            data: {
              branch: 'main',
              commit_message: commitMessage
            }
          }
        )
      );
      
      return response.data;
    } catch (error) {
      this.logger.error('Failed to delete file', error);
      throw new BadRequestException('Failed to delete file');
    }
  }

  // Pipeline Management
  async triggerPipeline(repositoryId: string, ref: string = 'main', variables: any = {}): Promise<GitlabPipelineDocument> {
    const repository = await this.getRepository(repositoryId);
    const tenantId = this.tenancyService.getTenantId();
    
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.gitlabBaseUrl}/api/v4/projects/${repository.gitlabProjectId}/pipeline`,
          {
            ref,
            variables: Object.entries(variables).map(([key, value]) => ({ key, value }))
          },
          {
            headers: { 'PRIVATE-TOKEN': this.gitlabToken }
          }
        )
      );
      
      // Store pipeline in local database
      const pipeline = new this.pipelineModel({
        ...this.mapGitlabPipelineToPipeline(response.data),
        tenantId,
        repositoryId,
        applicationId: repository.applicationId,
        pipelineType: variables.PIPELINE_TYPE || 'build',
      });
      
      return await pipeline.save();
    } catch (error) {
      this.logger.error('Failed to trigger pipeline', error);
      throw new BadRequestException('Failed to trigger pipeline');
    }
  }

  async getPipelines(repositoryId: string): Promise<GitlabPipelineDocument[]> {
    const tenantId = this.tenancyService.getTenantId();
    return this.pipelineModel.find({ tenantId, repositoryId }).sort({ createdAt: -1 }).exec();
  }

  async getPipeline(pipelineId: string): Promise<GitlabPipelineDocument> {
    const tenantId = this.tenancyService.getTenantId();
    const pipeline = await this.pipelineModel.findOne({ _id: pipelineId, tenantId }).exec();
    
    if (!pipeline) {
      throw new NotFoundException(`Pipeline with ID ${pipelineId} not found`);
    }
    
    return pipeline;
  }

  async cancelPipeline(pipelineId: string): Promise<GitlabPipelineDocument> {
    const pipeline = await this.getPipeline(pipelineId);
    
    try {
      await firstValueFrom(
        this.httpService.post(
          `${this.gitlabBaseUrl}/api/v4/projects/${pipeline.gitlabProjectId}/pipelines/${pipeline.gitlabPipelineId}/cancel`,
          {},
          {
            headers: { 'PRIVATE-TOKEN': this.gitlabToken }
          }
        )
      );
      
      // Update local pipeline status
      pipeline.status = 'canceled';
      return await pipeline.save();
    } catch (error) {
      this.logger.error('Failed to cancel pipeline', error);
      throw new BadRequestException('Failed to cancel pipeline');
    }
  }

  // User Management
  async createGitlabUser(userData: any): Promise<GitlabUserDocument> {
    const tenantId = this.tenancyService.getTenantId();
    
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.gitlabBaseUrl}/api/v4/users`,
          {
            email: userData.email,
            password: userData.password,
            username: userData.username,
            name: userData.name,
            skip_confirmation: true,
            projects_limit: userData.projectsLimit || 100000,
            can_create_group: userData.canCreateGroup !== false,
            admin: userData.isAdmin || false,
          },
          {
            headers: { 'PRIVATE-TOKEN': this.gitlabToken }
          }
        )
      );
      
      // Store in local database
      const user = new this.userModel({
        ...this.mapGitlabUserToUser(response.data),
        tenantId,
        webbuilderUserId: userData.webbuilderUserId,
        createdBy: userData.createdBy,
      });
      
      return await user.save();
    } catch (error) {
      this.logger.error('Failed to create GitLab user', error);
      throw new BadRequestException('Failed to create GitLab user');
    }
  }

  async getGitlabUsers(): Promise<GitlabUserDocument[]> {
    const tenantId = this.tenancyService.getTenantId();
    return this.userModel.find({ tenantId }).exec();
  }

  async getGitlabUser(id: string): Promise<GitlabUserDocument> {
    const tenantId = this.tenancyService.getTenantId();
    const user = await this.userModel.findOne({ _id: id, tenantId }).exec();
    
    if (!user) {
      throw new NotFoundException(`GitLab user with ID ${id} not found`);
    }
    
    return user;
  }

  async updateGitlabUser(id: string, updateData: any): Promise<GitlabUserDocument> {
    const tenantId = this.tenancyService.getTenantId();
    const user = await this.userModel.findOneAndUpdate(
      { _id: id, tenantId },
      updateData,
      { new: true }
    ).exec();
    
    if (!user) {
      throw new NotFoundException(`GitLab user with ID ${id} not found`);
    }
    
    // Sync with GitLab if needed
    if (updateData.syncWithGitlab) {
      await this.updateGitlabUserInGitlab(user.gitlabUserId, updateData);
    }
    
    return user;
  }

  async deleteGitlabUser(id: string): Promise<void> {
    const tenantId = this.tenancyService.getTenantId();
    const user = await this.getGitlabUser(id);
    
    // Delete from GitLab
    await this.deleteGitlabUserInGitlab(user.gitlabUserId);
    
    // Delete from local database
    await this.userModel.deleteOne({ _id: id, tenantId }).exec();
  }

  // Export Repository Code
  async exportRepositoryCode(repositoryId: string, format: string = 'zip'): Promise<Buffer> {
    const repository = await this.getRepository(repositoryId);
    
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.gitlabBaseUrl}/api/v4/projects/${repository.gitlabProjectId}/repository/archive.${format}`,
          {
            headers: { 'PRIVATE-TOKEN': this.gitlabToken },
            responseType: 'arraybuffer'
          }
        )
      );
      
      return Buffer.from(response.data);
    } catch (error) {
      this.logger.error('Failed to export repository code', error);
      throw new BadRequestException('Failed to export repository code');
    }
  }

  // Sync Methods
  async syncRepositoryWithGitlab(repositoryId: string): Promise<GitlabRepositoryDocument> {
    const repository = await this.getRepository(repositoryId);
    
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.gitlabBaseUrl}/api/v4/projects/${repository.gitlabProjectId}`,
          {
            headers: { 'PRIVATE-TOKEN': this.gitlabToken }
          }
        )
      );
      
      // Update local repository with GitLab data
      const updatedData = this.mapGitlabProjectToRepository(response.data);
      Object.assign(repository, updatedData);
      repository.lastSyncAt = new Date();
      repository.syncStatus = 'synced';
      
      return await repository.save();
    } catch (error) {
      this.logger.error('Failed to sync repository with GitLab', error);
      repository.syncStatus = 'error';
      await repository.save();
      throw new BadRequestException('Failed to sync repository with GitLab');
    }
  }

  // Private helper methods
  private async createGitlabProject(projectData: any): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.post(
        `${this.gitlabBaseUrl}/api/v4/projects`,
        {
          name: projectData.name,
          path: projectData.path || projectData.name.toLowerCase().replace(/\s+/g, '-'),
          description: projectData.description,
          visibility: projectData.visibility || 'private',
          initialize_with_readme: true,
          default_branch: 'main',
        },
        {
          headers: { 'PRIVATE-TOKEN': this.gitlabToken }
        }
      )
    );
    
    return response.data;
  }

  private async updateGitlabProject(projectId: number, updateData: any): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.put(
        `${this.gitlabBaseUrl}/api/v4/projects/${projectId}`,
        updateData,
        {
          headers: { 'PRIVATE-TOKEN': this.gitlabToken }
        }
      )
    );
    
    return response.data;
  }

  private async deleteGitlabProject(projectId: number): Promise<void> {
    await firstValueFrom(
      this.httpService.delete(
        `${this.gitlabBaseUrl}/api/v4/projects/${projectId}`,
        {
          headers: { 'PRIVATE-TOKEN': this.gitlabToken }
        }
      )
    );
  }

  private async updateGitlabUserInGitlab(userId: number, updateData: any): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.put(
        `${this.gitlabBaseUrl}/api/v4/users/${userId}`,
        updateData,
        {
          headers: { 'PRIVATE-TOKEN': this.gitlabToken }
        }
      )
    );
    
    return response.data;
  }

  private async deleteGitlabUserInGitlab(userId: number): Promise<void> {
    await firstValueFrom(
      this.httpService.delete(
        `${this.gitlabBaseUrl}/api/v4/users/${userId}`,
        {
          headers: { 'PRIVATE-TOKEN': this.gitlabToken }
        }
      )
    );
  }

  private mapGitlabProjectToRepository(gitlabProject: any): Partial<GitlabRepository> {
    return {
      gitlabProjectId: gitlabProject.id,
      name: gitlabProject.name,
      description: gitlabProject.description,
      path: gitlabProject.path,
      namespace: gitlabProject.namespace?.name || gitlabProject.namespace?.path,
      fullPath: gitlabProject.path_with_namespace,
      visibility: gitlabProject.visibility,
      webUrl: gitlabProject.web_url,
      sshUrl: gitlabProject.ssh_url_to_repo,
      httpUrl: gitlabProject.http_url_to_repo,
      defaultBranch: gitlabProject.default_branch,
      tags: gitlabProject.tag_list || [],
      topics: gitlabProject.topics || [],
      archived: gitlabProject.archived,
      avatarUrl: gitlabProject.avatar_url,
      starCount: gitlabProject.star_count,
      forkCount: gitlabProject.forks_count,
      lastActivityAt: gitlabProject.last_activity_at ? new Date(gitlabProject.last_activity_at) : undefined,
    };
  }

  private mapGitlabUserToUser(gitlabUser: any): Partial<GitlabUser> {
    return {
      gitlabUserId: gitlabUser.id,
      username: gitlabUser.username,
      email: gitlabUser.email,
      name: gitlabUser.name,
      state: gitlabUser.state,
      avatarUrl: gitlabUser.avatar_url,
      webUrl: gitlabUser.web_url,
      bio: gitlabUser.bio,
      location: gitlabUser.location,
      publicEmail: gitlabUser.public_email,
      skype: gitlabUser.skype,
      linkedin: gitlabUser.linkedin,
      twitter: gitlabUser.twitter,
      websiteUrl: gitlabUser.website_url,
      organization: gitlabUser.organization,
      jobTitle: gitlabUser.job_title,
      isAdmin: gitlabUser.is_admin,
      canCreateGroup: gitlabUser.can_create_group,
      canCreateProject: gitlabUser.can_create_project,
      twoFactorEnabled: gitlabUser.two_factor_enabled,
      external: gitlabUser.external,
      privateProfile: gitlabUser.private_profile,
      projectsLimit: gitlabUser.projects_limit,
    };
  }

  private mapGitlabPipelineToPipeline(gitlabPipeline: any): Partial<GitlabPipeline> {
    return {
      gitlabPipelineId: gitlabPipeline.id,
      gitlabProjectId: gitlabPipeline.project_id,
      status: gitlabPipeline.status,
      ref: gitlabPipeline.ref,
      sha: gitlabPipeline.sha,
      beforeSha: gitlabPipeline.before_sha,
      tag: gitlabPipeline.tag,
      yamlErrors: gitlabPipeline.yaml_errors || [],
      user: gitlabPipeline.user,
      createdAt: gitlabPipeline.created_at ? new Date(gitlabPipeline.created_at) : undefined,
      updatedAt: gitlabPipeline.updated_at ? new Date(gitlabPipeline.updated_at) : undefined,
      startedAt: gitlabPipeline.started_at ? new Date(gitlabPipeline.started_at) : undefined,
      finishedAt: gitlabPipeline.finished_at ? new Date(gitlabPipeline.finished_at) : undefined,
      committedAt: gitlabPipeline.committed_at ? new Date(gitlabPipeline.committed_at) : undefined,
      duration: gitlabPipeline.duration,
      queuedDuration: gitlabPipeline.queued_duration,
      coverage: gitlabPipeline.coverage,
      webUrl: gitlabPipeline.web_url,
      detailedStatus: gitlabPipeline.detailed_status,
      source: gitlabPipeline.source,
      name: gitlabPipeline.name,
      iid: gitlabPipeline.iid,
    };
  }
}
