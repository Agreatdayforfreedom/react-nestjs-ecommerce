import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto, UpdateProductDto } from '../../dtos/product.dto';
import { Product } from '../../entities/product.entity';
import { In, Repository } from 'typeorm';
import { Category } from '../../entities/categories.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepo.find({
      relations: ['categories'],
    });
  }
  async findAllFilter(query: any): Promise<Product[]> {
    if (query.minPrice && query.maxPrice) {
      return await this.productRepo
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.categories', 'categories')
        .where('product.name like :name', {
          name: `%${query.search}%`,
        })
        .orWhere('product.author like :author', {
          author: `%${query.search}%`,
        })
        .andWhere('product.price > :minPrice', {
          minPrice: query.minPrice,
        })
        .andWhere('product.price < :maxPrice', {
          maxPrice: query.maxPrice,
        })
        .getMany();
    }

    return await this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.categories', 'categories')
      .where('product.name like :name', {
        name: `%${query.search}%`,
      })
      .orWhere('product.author like :author', {
        author: `%${query.search}%`,
      })
      .getMany();
  }

  async findOne(id: number): Promise<Product> {
    const [product] = await this.productRepo.find({
      relations: { user: true },
      where: { id: id },
    });

    return product;
  }

  async create(payload: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create(payload);
    if (payload.categories) {
      const categories = await this.categoryRepo.find({
        where: { id: In([...payload.categories]) },
      });
      product.categories = categories;
    }
    return await this.productRepo.save(product);
  }

  async update(id: number, payload: UpdateProductDto, req: any) {
    const userReq = req.user as { id: number; username: string; role: string };

    const [product] = await this.productRepo.find({
      relations: { user: true },
      where: { id: id },
    });
    if (!product) throw new HttpException('Product not found', 404);

    if (product.user.id !== userReq.id) {
      throw new HttpException('You are not owner of this product', 401);
    }
    const productUpdated = this.productRepo.merge(product, payload);
    return await this.productRepo.save(productUpdated);
  }

  async delete(id: number, req: any) {
    console.log(id, req.user);
    const userReq = req.user as { id: number; username: string; role: string };

    const [product] = await this.productRepo.find({
      relations: { user: true },
      where: { id: id },
    });
    if (!product) throw new HttpException('Product not found', 404);

    if (product.user.id !== userReq.id) {
      throw new HttpException('You are not owner of this product', 401);
    }
    return await this.productRepo.delete(id);
  }
}
