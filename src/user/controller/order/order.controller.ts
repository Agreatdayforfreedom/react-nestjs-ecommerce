import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
} from '@nestjs/common';
import { OrderService } from '../../services/order/order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  findAll(@Request() req: any) {
    return this.orderService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.orderService.findOne(id, req);
  }

  @Post()
  create(@Request() req: any) {
    return this.orderService.create(req);
  }
}
