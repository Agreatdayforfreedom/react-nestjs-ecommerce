import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
} from '@nestjs/common';
import { User } from '../../../auth/decorators/user.decorator';
import { PayloadAuth } from '../../../auth/models/token.model';
import { OrderService } from '../../services/order/order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  findAll(@User() userReq: PayloadAuth) {
    return this.orderService.findAll(userReq);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @User() userReq: PayloadAuth) {
    return this.orderService.findOne(id, userReq);
  }

  @Post()
  create(@User() userReq: PayloadAuth) {
    return this.orderService.create(userReq);
  }
}
