import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { CartService } from '../../services/cart/cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCart(@Request() req: any) {
    return this.cartService.getCart(req);
  }

  @Post()
  addToCart(@Body() payload: any, @Request() req: any) {
    return this.cartService.addToCart(payload, req);
  }
}
