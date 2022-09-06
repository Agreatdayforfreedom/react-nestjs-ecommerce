import { Controller, Get, Post, Request } from '@nestjs/common';
import { OrderService } from '../../services/order/order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Post()
  create(@Request() req: any) {
    return this.orderService.create(req);
  }
}
