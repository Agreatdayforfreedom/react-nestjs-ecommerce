import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from '../auth/jwt.strategy';
import { ProductController } from './controllers/product/product.controller';
import { Product } from './entities/product.entity';
import { ProductService } from './services/product/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), UserModule],
  controllers: [ProductController],
  providers: [ProductService, JwtStrategy],
})
export class ProductModule {}
