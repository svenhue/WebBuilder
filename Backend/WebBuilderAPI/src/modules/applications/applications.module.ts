import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { Application, ApplicationSchema } from './schemas/application.schema';
import { TemplatesController } from './ui.templates.controller';
import { UITemplatesService } from './ui.templates.service';
import { TemplateSchema, UITemplate } from './schemas/template.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Application.name, schema: ApplicationSchema },
      { name: UITemplate.name, schema: TemplateSchema}
    ]),
  ],
  controllers: [ApplicationsController, TemplatesController],
  providers: [ApplicationsService, UITemplatesService],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
