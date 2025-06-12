import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { Application, ApplicationSchema } from './schemas/application.schema';
import { TemplatesController } from './ui.templates.controller';
import { UITemplatesService } from './ui.templates.service';
import { TemplateSchema, UITemplate } from './schemas/template.schema';
import { TemplateCategory, TemplateCategorySchema } from './schemas/template.categorys';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Application.name, schema: ApplicationSchema },
      { name: UITemplate.name, schema: TemplateSchema},
      {
        name: TemplateCategory.name,
        schema: TemplateCategorySchema
      }
    ]),
  ],
  controllers: [ApplicationsController, TemplatesController],
  providers: [ApplicationsService, UITemplatesService],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
