import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Public } from '../../../auth/decorators/public.decorator';
import { CreateProductDto, UpdateProductDto } from '../../dtos/product.dto';
import { ProductService } from '../../services/product/product.service';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { Role } from '../../../auth/models/role.model';

@UseGuards(RolesGuard)
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Public()
  @Get()
  findAll() {
    return this.productService.getAll();
  }

  @Roles(Role.SELLER)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Roles(Role.SELLER)
  @Post()
  create(@Body() payload: CreateProductDto, @Request() req: any) {
    return this.productService.create(payload, req.user);
  }

  @Roles(Role.SELLER)
  @Put(':id')
  update(
    @Request() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productService.update(id, payload, req);
  }

  @Roles(Role.SELLER)
  @Delete(':id')
  delete(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id, req);
  }
}
