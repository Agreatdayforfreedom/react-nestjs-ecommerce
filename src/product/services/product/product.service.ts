import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto, UpdateProductDto } from '../../dtos/product.dto';
import { Product } from '../../entities/product.entity';
import { Repository } from 'typeorm';
import { UserService } from '../../../user/services/user/user.service';
import { Request } from 'express';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private userService: UserService,
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.productRepo.find();
  }

  async findOne(id: number): Promise<Product> {
    const [product] = await this.productRepo.find({
      relations: { user: true },
      where: { id: id },
    });

    return product;
  }

  async create(payload: CreateProductDto, userObject: any): Promise<Product> {
    const product = this.productRepo.create(payload);

    const [user] = await this.userService.findOneU(userObject.id);
    //if it doesn't found a user, it is becouse doesn't exist in the request
    if (!user) throw new HttpException('You have to be registered', 401);
    product.user = user;

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
