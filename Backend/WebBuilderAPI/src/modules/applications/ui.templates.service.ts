import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UITemplate, UITemplateDocument } from './schemas/template.schema';
import { TemplateDto } from './dto/template.dto';
import { TemplateCategory, TemplateCategoryDocument } from './schemas/template.categorys';

@Injectable()
export class UITemplatesService {
  constructor(
    @InjectModel(UITemplate.name) private uiTemplatenModel: Model<UITemplateDocument>,
    @InjectModel(TemplateCategory.name) private categoryModel: Model<TemplateCategoryDocument>
  ) {}

  async create(createUITemplateDto: TemplateDto): Promise<UITemplateDocument> {
    if (!createUITemplateDto.version) {
      createUITemplateDto.version = '0.0.1'; // Default version if not provided
    }
    const uiTemplate = new this.uiTemplatenModel({
      ...createUITemplateDto
    });
    return uiTemplate.save();
  }

    async findAll(): Promise<UITemplateDocument[]> {
        return this.uiTemplatenModel.find({}).exec();
    }

    async findOne(id: string): Promise<UITemplateDocument> {
        const uiTemplate = await this.uiTemplatenModel.findOne({ _id: id }).exec();
        if (!uiTemplate) {
            throw new NotFoundException(`UITemplate with ID ${id} not found`);
        }
        return uiTemplate;
    }

    async update(id: string, updateUITemplateDto: TemplateDto): Promise<UITemplateDocument> {
        const uiTemplate = await this.uiTemplatenModel.findOneAndUpdate(
            { _id: id },
            updateUITemplateDto,
            { new: true }
        ).exec();
        if (!uiTemplate) {
            throw new NotFoundException(`UITemplate with ID ${id} not found`);
        }
        return uiTemplate;
    }

    async delete(id: string): Promise<void> {
        const result = await this.uiTemplatenModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException(`UITemplate with ID ${id} not found`);
        }
    }




    // -------------------------- category section

    async createCategory(name: string): Promise<TemplateCategoryDocument> {

    const category = new this.categoryModel({
      name: name
    });
    return category.save();
  }

}