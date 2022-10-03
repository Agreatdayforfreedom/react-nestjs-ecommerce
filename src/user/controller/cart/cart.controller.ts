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
import { User } from '../../../auth/decorators/user.decorator';
import { PayloadAuth } from '../../../auth/models/token.model';
import { AddCartDto, UpdateCartDto } from '../../dtos/cart.dto';
import { CartService } from '../../services/cart/cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCart(@User() userReq: PayloadAuth) {
    console.log(userReq);
    return this.cartService.getCart(userReq);
  }

  @Get('/gz')
  getCartItem(@User() userReq: PayloadAuth) {
    console.log(userReq);
    return this.cartService.getCartItem(userReq);
  }

  @Post()
  addToCart(@Body() payload: AddCartDto, @User() userReq: PayloadAuth) {
    return this.cartService.addToCart(payload, userReq);
  }

  @Put(':id')
  updateItemCart(
    @Body() payload: UpdateCartDto,
    @Param('id', ParseIntPipe) id: number,
    @User() userReq: PayloadAuth,
  ) {
    return this.cartService.updateItemCart(payload, id, userReq);
  }

  @Delete(':id')
  deleteItemCart(
    @Param('id', ParseIntPipe) id: number,
    @User() userReq: PayloadAuth,
  ) {
    return this.cartService.deleteItemCart(id, userReq);
  }
}
