import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  Res,
  StreamableFile,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Response } from 'express';
import { GitlabService } from './gitlab.service';
import { TenantInterceptor } from '../../shared/tenancy/tenant.interceptor';

@ApiTags('GitLab Integration')
@ApiBearerAuth()
@Controller('gitlab')
@UseInterceptors(TenantInterceptor)
export class GitlabController {
  constructor(private readonly gitlabService: GitlabService) {}

  // Repository Management Endpoints
  @Post('repositories')
  @ApiOperation({ summary: 'Create a new GitLab repository' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'my-webbuilder-app' },
        description: { type: 'string', example: 'WebBuilder application repository' },
        visibility: { type: 'string', enum: ['private', 'internal', 'public'], example: 'private' },
        applicationId: { type: 'string', example: '507f1f77bcf86cd799439011' },
        path: { type: 'string', example: 'my-webbuilder-app' },
      },
      required: ['name']
    }
  })
  @ApiResponse({ status: 201, description: 'Repository created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createRepository(@Body() createRepoData: any) {
    return this.gitlabService.createRepository(createRepoData);
  }

  @Get('repositories')
  @ApiOperation({ summary: 'Get all GitLab repositories' })
  @ApiResponse({ status: 200, description: 'Repositories retrieved successfully' })
  async getRepositories() {
    return this.gitlabService.getRepositories();
  }

  @Get('repositories/:id')
  @ApiOperation({ summary: 'Get repository by ID' })
  @ApiParam({ name: 'id', description: 'Repository ID' })
  @ApiResponse({ status: 200, description: 'Repository retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Repository not found' })
  async getRepository(@Param('id') id: string) {
    return this.gitlabService.getRepository(id);
  }

  @Put('repositories/:id')
  @ApiOperation({ summary: 'Update repository' })
  @ApiParam({ name: 'id', description: 'Repository ID' })
  @ApiResponse({ status: 200, description: 'Repository updated successfully' })
  @ApiResponse({ status: 404, description: 'Repository not found' })
  async updateRepository(@Param('id') id: string, @Body() updateData: any) {
    return this.gitlabService.updateRepository(id, updateData);
  }

  @Delete('repositories/:id')
  @ApiOperation({ summary: 'Delete repository' })
  @ApiParam({ name: 'id', description: 'Repository ID' })
  @ApiResponse({ status: 200, description: 'Repository deleted successfully' })
  @ApiResponse({ status: 404, description: 'Repository not found' })
  async deleteRepository(@Param('id') id: string) {
    await this.gitlabService.deleteRepository(id);
    return { message: 'Repository deleted successfully' };
  }

  @Post('repositories/:id/sync')
  @ApiOperation({ summary: 'Sync repository with GitLab' })
  @ApiParam({ name: 'id', description: 'Repository ID' })
  @ApiResponse({ status: 200, description: 'Repository synced successfully' })
  async syncRepository(@Param('id') id: string) {
    return this.gitlabService.syncRepositoryWithGitlab(id);
  }

  // File Management Endpoints
  @Get('repositories/:id/files')
  @ApiOperation({ summary: 'Get repository files' })
  @ApiParam({ name: 'id', description: 'Repository ID' })
  @ApiQuery({ name: 'path', description: 'File path', required: false })
  @ApiQuery({ name: 'ref', description: 'Branch/tag reference', required: false, example: 'main' })
  @ApiResponse({ status: 200, description: 'Files retrieved successfully' })
  async getRepositoryFiles(
    @Param('id') id: string,
    @Query('path') path?: string,
    @Query('ref') ref?: string
  ) {
    return this.gitlabService.getRepositoryFiles(id, path, ref);
  }

  @Get('repositories/:id/files/content')
  @ApiOperation({ summary: 'Get file content' })
  @ApiParam({ name: 'id', description: 'Repository ID' })
  @ApiQuery({ name: 'file_path', description: 'File path', required: true })
  @ApiQuery({ name: 'ref', description: 'Branch/tag reference', required: false, example: 'main' })
  @ApiResponse({ status: 200, description: 'File content retrieved successfully' })
  @ApiResponse({ status: 404, description: 'File not found' })
  async getFileContent(
    @Param('id') id: string,
    @Query('file_path') filePath: string,
    @Query('ref') ref?: string
  ) {
    return this.gitlabService.getFileContent(id, filePath, ref);
  }

  @Post('repositories/:id/files')
  @ApiOperation({ summary: 'Create or update file' })
  @ApiParam({ name: 'id', description: 'Repository ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file_path: { type: 'string', example: 'src/index' },
        content: { type: 'string', example: 'console.log("Hello World");' },
        commit_message: { type: 'string', example: 'Add new file' },
        branch: { type: 'string', example: 'main' },
        author_name: { type: 'string', example: 'John Doe' },
        author_email: { type: 'string', example: 'john@example.com' },
      },
      required: ['file_path', 'content']
    }
  })
  @ApiResponse({ status: 201, description: 'File created/updated successfully' })
  async createOrUpdateFile(@Param('id') id: string, @Body() fileData: any) {
    return this.gitlabService.createOrUpdateFile(id, fileData);
  }

  @Put('repositories/:id/files')
  @ApiOperation({ summary: 'Update existing file' })
  @ApiParam({ name: 'id', description: 'Repository ID' })
  @ApiResponse({ status: 200, description: 'File updated successfully' })
  async updateFile(@Param('id') id: string, @Body() fileData: any) {
    return this.gitlabService.updateFile(id, fileData);
  }

  @Delete('repositories/:id/files')
  @ApiOperation({ summary: 'Delete file' })
  @ApiParam({ name: 'id', description: 'Repository ID' })
  @ApiQuery({ name: 'file_path', description: 'File path to delete', required: true })
  @ApiQuery({ name: 'commit_message', description: 'Commit message', required: false })
  @ApiResponse({ status: 200, description: 'File deleted successfully' })
  async deleteFile(
    @Param('id') id: string,
    @Query('file_path') filePath: string,
    @Query('commit_message') commitMessage?: string
  ) {
    return this.gitlabService.deleteFile(id, filePath, commitMessage);
  }

  // Pipeline Management Endpoints
  @Post('repositories/:id/pipelines/trigger')
  @ApiOperation({ summary: 'Trigger CI/CD pipeline' })
  @ApiParam({ name: 'id', description: 'Repository ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        ref: { type: 'string', example: 'main', description: 'Branch or tag to build' },
        variables: {
          type: 'object',
          example: {
            PIPELINE_TYPE: 'build',
            NODE_VERSION: '18',
            ENVIRONMENT: 'production'
          }
        }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Pipeline triggered successfully' })
  async triggerPipeline(@Param('id') id: string, @Body() pipelineData: any) {
    const { ref = 'main', variables = {} } = pipelineData;
    return this.gitlabService.triggerPipeline(id, ref, variables);
  }

  @Get('repositories/:id/pipelines')
  @ApiOperation({ summary: 'Get repository pipelines' })
  @ApiParam({ name: 'id', description: 'Repository ID' })
  @ApiResponse({ status: 200, description: 'Pipelines retrieved successfully' })
  async getPipelines(@Param('id') id: string) {
    return this.gitlabService.getPipelines(id);
  }

  @Get('pipelines/:id')
  @ApiOperation({ summary: 'Get pipeline by ID' })
  @ApiParam({ name: 'id', description: 'Pipeline ID' })
  @ApiResponse({ status: 200, description: 'Pipeline retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Pipeline not found' })
  async getPipeline(@Param('id') id: string) {
    return this.gitlabService.getPipeline(id);
  }

  @Post('pipelines/:id/cancel')
  @ApiOperation({ summary: 'Cancel pipeline' })
  @ApiParam({ name: 'id', description: 'Pipeline ID' })
  @ApiResponse({ status: 200, description: 'Pipeline canceled successfully' })
  async cancelPipeline(@Param('id') id: string) {
    return this.gitlabService.cancelPipeline(id);
  }

  // User Management Endpoints
  @Post('users')
  @ApiOperation({ summary: 'Create GitLab user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'john.doe' },
        email: { type: 'string', example: 'john.doe@example.com' },
        name: { type: 'string', example: 'John Doe' },
        password: { type: 'string', example: 'SecurePassword123!' },
        projectsLimit: { type: 'number', example: 100000 },
        canCreateGroup: { type: 'boolean', example: true },
        isAdmin: { type: 'boolean', example: false },
        webbuilderUserId: { type: 'string', example: '507f1f77bcf86cd799439011' },
      },
      required: ['username', 'email', 'name', 'password']
    }
  })
  @ApiResponse({ status: 201, description: 'GitLab user created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createGitlabUser(@Body() userData: any) {
    return this.gitlabService.createGitlabUser(userData);
  }

  @Get('users')
  @ApiOperation({ summary: 'Get all GitLab users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  async getGitlabUsers() {
    return this.gitlabService.getGitlabUsers();
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Get GitLab user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getGitlabUser(@Param('id') id: string) {
    return this.gitlabService.getGitlabUser(id);
  }

  @Put('users/:id')
  @ApiOperation({ summary: 'Update GitLab user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async updateGitlabUser(@Param('id') id: string, @Body() updateData: any) {
    return this.gitlabService.updateGitlabUser(id, updateData);
  }

  @Delete('users/:id')
  @ApiOperation({ summary: 'Delete GitLab user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async deleteGitlabUser(@Param('id') id: string) {
    await this.gitlabService.deleteGitlabUser(id);
    return { message: 'GitLab user deleted successfully' };
  }

  // Repository Export Endpoints
  @Get('repositories/:id/export')
  @ApiOperation({ summary: 'Export repository code' })
  @ApiParam({ name: 'id', description: 'Repository ID' })
  @ApiQuery({ 
    name: 'format', 
    description: 'Export format', 
    required: false, 
    enum: ['zip', 'tar.gz', 'tar.bz2', 'tar'], 
    example: 'zip' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Repository exported successfully',
    content: {
      'application/zip': {
        schema: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  async exportRepository(
    @Param('id') id: string,
    @Query('format') format: string = 'zip',
    @Res({ passthrough: true }) res: Response
  ) {
    const buffer = await this.gitlabService.exportRepositoryCode(id, format);
    const repository = await this.gitlabService.getRepository(id);
    
    res.set({
      'Content-Type': `application/${format === 'zip' ? 'zip' : 'gzip'}`,
      'Content-Disposition': `attachment; filename="${repository.name}.${format}"`,
    });
    
    return new StreamableFile(buffer);
  }

  // Webhook Endpoints for GitLab Integration
  @Post('webhooks/pipeline')
  @ApiOperation({ summary: 'Handle GitLab pipeline webhook' })
  @ApiBody({ description: 'GitLab pipeline webhook payload' })
  @ApiResponse({ status: 200, description: 'Webhook processed successfully' })
  async handlePipelineWebhook(@Body() webhookData: any) {
    // Process GitLab pipeline webhook
    // Update local pipeline status, send notifications, etc.
    return { message: 'Pipeline webhook processed successfully' };
  }

  @Post('webhooks/push')
  @ApiOperation({ summary: 'Handle GitLab push webhook' })
  @ApiBody({ description: 'GitLab push webhook payload' })
  @ApiResponse({ status: 200, description: 'Webhook processed successfully' })
  async handlePushWebhook(@Body() webhookData: any) {
    // Process GitLab push webhook
    // Trigger builds, update repository info, etc.
    return { message: 'Push webhook processed successfully' };
  }

  // Build Templates and CI/CD Configuration
  @Post('repositories/:id/ci-config')
  @ApiOperation({ summary: 'Generate CI/CD configuration for repository' })
  @ApiParam({ name: 'id', description: 'Repository ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        template: { 
          type: 'string', 
          enum: ['nodejs', 'vue', 'react', 'nuxt', 'static'], 
          example: 'nuxt' 
        },
        buildCommand: { type: 'string', example: 'npm run build' },
        outputDirectory: { type: 'string', example: 'dist' },
        nodeVersion: { type: 'string', example: '18' },
        environment: {
          type: 'object',
          example: {
            NODE_ENV: 'production',
            API_URL: 'https://api.example.com'
          }
        }
      },
      required: ['template']
    }
  })
  @ApiResponse({ status: 201, description: 'CI/CD configuration created successfully' })
  async generateCiConfig(@Param('id') id: string, @Body() configData: any) {
    const ciYaml = this.generateGitlabCiYaml(configData);
    
    // Create .gitlab-ci.yml file in the repository
    return this.gitlabService.createOrUpdateFile(id, {
      file_path: '.gitlab-ci.yml',
      content: ciYaml,
      commit_message: 'Add GitLab CI/CD configuration',
      branch: 'main'
    });
  }

  // Statistics and Analytics
  @Get('repositories/:id/stats')
  @ApiOperation({ summary: 'Get repository statistics' })
  @ApiParam({ name: 'id', description: 'Repository ID' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  async getRepositoryStats(@Param('id') id: string) {
    const repository = await this.gitlabService.getRepository(id);
    const pipelines = await this.gitlabService.getPipelines(id);
    
    return {
      repository: {
        name: repository.name,
        starCount: repository.starCount,
        forkCount: repository.forkCount,
        lastActivity: repository.lastActivityAt,
      },
      pipelines: {
        total: pipelines.length,
        successful: pipelines.filter(p => p.status === 'success').length,
        failed: pipelines.filter(p => p.status === 'failed').length,
        running: pipelines.filter(p => p.status === 'running').length,
      },
      builds: {
        lastBuild: pipelines[0]?.createdAt,
        averageDuration: pipelines.reduce((acc, p) => acc + (p.duration || 0), 0) / pipelines.length || 0,
      }
    };
  }

  // Helper method to generate GitLab CI YAML
  private generateGitlabCiYaml(config: any): string {
    const templates = {
      nodejs: `
stages:
  - build
  - test
  - deploy

variables:
  NODE_VERSION: "${config.nodeVersion || '18'}"

before_script:
  - node --version
  - npm --version

build:
  stage: build
  image: node:\${NODE_VERSION}
  script:
    - npm ci
    - ${config.buildCommand || 'npm run build'}
  artifacts:
    paths:
      - ${config.outputDirectory || 'dist'}/
    expire_in: 1 hour
  only:
    - main
    - develop

test:
  stage: test
  image: node:\${NODE_VERSION}
  script:
    - npm ci
    - npm run test
  only:
    - main
    - develop

deploy:
  stage: deploy
  image: alpine:latest
  script:
    - echo "Deploying application..."
    - echo "Build artifacts available in ${config.outputDirectory || 'dist'}/"
  artifacts:
    paths:
      - ${config.outputDirectory || 'dist'}/
  only:
    - main
`,
      nuxt: `
stages:
  - build
  - test
  - deploy

variables:
  NODE_VERSION: "${config.nodeVersion || '18'}"

before_script:
  - node --version
  - npm --version

build:
  stage: build
  image: node:\${NODE_VERSION}
  script:
    - npm ci
    - ${config.buildCommand || 'npm run build'}
  artifacts:
    paths:
      - ${config.outputDirectory || '.output'}/
    expire_in: 1 hour
  only:
    - main
    - develop

test:
  stage: test
  image: node:\${NODE_VERSION}
  script:
    - npm ci
    - npm run test
  only:
    - main
    - develop

deploy:
  stage: deploy
  image: alpine:latest
  script:
    - echo "Deploying Nuxt application..."
    - echo "Build artifacts available in ${config.outputDirectory || '.output'}/"
  artifacts:
    paths:
      - ${config.outputDirectory || '.output'}/
  only:
    - main
`,
      static: `
stages:
  - build
  - deploy

build:
  stage: build
  image: alpine:latest
  script:
    - echo "Building static site..."
    - mkdir -p ${config.outputDirectory || 'public'}
    - cp -r * ${config.outputDirectory || 'public'}/ || true
  artifacts:
    paths:
      - ${config.outputDirectory || 'public'}/
    expire_in: 1 hour
  only:
    - main

deploy:
  stage: deploy
  image: alpine:latest
  script:
    - echo "Deploying static site..."
    - echo "Static files available in ${config.outputDirectory || 'public'}/"
  artifacts:
    paths:
      - ${config.outputDirectory || 'public'}/
  only:
    - main
`
    };

    return templates[config.template] || templates.nodejs;
  }
}
