import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { JwtStrategy } from '../auth/jwt.strategy';
import { ProductController } from './controllers/product/product.controller';
import { Product } from './entities/product.entity';
import { ProductService } from './services/product/product.service';
import { CategoriesController } from './controllers/categories/categories.controller';
import { CategoriesService } from './services/categories/categories.service';
import { Category } from './entities/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category]), UserModule],
  controllers: [ProductController, CategoriesController],
  providers: [ProductService, JwtStrategy, CategoriesService],
})
export class ProductModule {}
