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
} from '@nestjs/common';
import { AddCartDto, UpdateCartDto } from '../../dtos/cart.dto';
import { CartService } from '../../services/cart/cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCart(@Request() req: any) {
    return this.cartService.getCart(req);
  }

  @Post()
  addToCart(@Body() payload: AddCartDto, @Request() req: any) {
    return this.cartService.addToCart(payload, req);
  }

  @Put(':id')
  updateItemCart(
    @Body() payload: UpdateCartDto,
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    return this.cartService.updateItemCart(payload, id, req);
  }

  @Delete(':id')
  deleteItemCart(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.cartService.deleteItemCart(id, req);
  }
}
