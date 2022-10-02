import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { JwtStrategy } from '../auth/jwt.strategy';
import { BookController } from './controllers/book/book.controller';
import { Book } from './entities/book.entity';
import { BookService } from './services/book/book.service';
import { CategoriesController } from './controllers/categories/categories.controller';
import { CategoriesService } from './services/categories/categories.service';
import { Category } from './entities/categories.entity';
import { MetadataController } from './controllers/metadata/metadata.controller';
import { MetadataService } from './services/metadata/metadata.service';
import { Metadata } from './entities/metadata.entity';
import { Message } from './entities/message.entity';
import { MessagesController } from './controllers/messages/messages.controller';
import { MessagesService } from './services/messages/messages.service';
import { BuyService } from './services/book/buy.service';
import { BuyController } from './controllers/book/buy.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Category, Metadata, Message]),
    forwardRef(() => UserModule),
  ],
  controllers: [
    BookController,
    CategoriesController,
    MetadataController,
    MessagesController,
    BuyController,
  ],
  providers: [
    BookService,
    JwtStrategy,
    CategoriesService,
    MetadataService,
    MessagesService,
    BuyService,
  ],
  exports: [MessagesService, TypeOrmModule],
})
export class BookModule {}
