import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { GitlabController } from './gitlab.controller';
import { GitlabService } from './gitlab.service';
import { GitlabRepository, GitlabRepositorySchema } from './schemas/gitlab-repository.schema';
import { GitlabUser, GitlabUserSchema } from './schemas/gitlab-user.schema';
import { GitlabPipeline, GitlabPipelineSchema } from './schemas/gitlab-pipeline.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: GitlabRepository.name, schema: GitlabRepositorySchema },
      { name: GitlabUser.name, schema: GitlabUserSchema },
      { name: GitlabPipeline.name, schema: GitlabPipelineSchema },
    ]),
  ],
  controllers: [GitlabController],
  providers: [GitlabService],
  exports: [GitlabService],
})
export class GitlabModule {}
