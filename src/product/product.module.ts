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
import { MetadataController } from './controllers/metadata/metadata.controller';
import { MetadataService } from './services/metadata/metadata.service';
import { Metadata } from './entities/metadata.entity';
import { Message } from './entities/message.entity';
import { MessagesController } from './controllers/messages/messages.controller';
import { MessagesService } from './services/messages/messages.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, Metadata, Message]),
    UserModule,
  ],
  controllers: [
    ProductController,
    CategoriesController,
    MetadataController,
    MessagesController,
  ],
  providers: [
    ProductService,
    JwtStrategy,
    CategoriesService,
    MetadataService,
    MessagesService,
  ],
  exports: [MessagesService],
})
export class ProductModule {}
