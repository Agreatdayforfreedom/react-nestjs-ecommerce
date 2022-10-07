import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
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

  @Put('cancel/:orderId')
  cancelOrder(
    @Param('orderId', ParseIntPipe) orderId: number,
    @User() userReq: PayloadAuth,
  ) {
    return this.orderService.cancelOrder(orderId, userReq);
  }

  @Post('/shipper/:orderId')
  selectOrderShipper(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() payload: { shipperValue: number },
    @User() userReq: PayloadAuth,
  ) {
    return this.orderService.selectOrderShipper(orderId, payload, userReq);
  }
}
