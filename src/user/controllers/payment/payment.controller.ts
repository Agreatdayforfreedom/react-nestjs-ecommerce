import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Enum_PaymentType } from '../../entities/payment.entity';
import { User } from '../../../auth/decorators/user.decorator';
import { PayloadAuth } from '../../../auth/models/token.model';
import {
  PaymentService,
  PaymentType,
} from '../../services/payment/payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post(':orderId')
  implPayment(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() paymentType: PaymentType,
    @User() userReq: PayloadAuth,
  ) {
    return this.paymentService.implPayment(orderId, paymentType, userReq);
  }
}
