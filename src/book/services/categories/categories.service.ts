import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../../dtos/categories.dto';
import { Category } from '../../entities/categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async findAll() {
    return await this.categoryRepo.find({
      relations: ['books'],
    });
  }

  async findOne(id: number) {
    const [category] = await this.categoryRepo.find({
      relations: ['books'],
      where: { id: id },
    });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async create(payload: CreateCategoryDto) {
    const category = this.categoryRepo.create(payload);
    return await this.categoryRepo.save(category);
  }

  async update(id: number, payload: UpdateCategoryDto) {
    const [category] = await this.categoryRepo.find({ where: { id: id } });
    if (!category) throw new HttpException('Category not found', 404);

    const categoryUpdated = this.categoryRepo.merge(category, payload);
    return await this.categoryRepo.save(categoryUpdated);
  }

  async delete(id: number) {
    return await this.categoryRepo.delete(id);
  }
}
