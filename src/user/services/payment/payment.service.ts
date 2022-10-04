import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enum_PaymentType, Payment } from '../../entities/payment.entity';
import { Repository } from 'typeorm';
import { OrderService } from '../order/order.service';
import { PayloadAuth } from '../../../auth/models/token.model';

export type PaymentType = {
  paymentType: Enum_PaymentType;
};

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
    private orderService: OrderService,
  ) {}

  async implPayment(
    orderId: number,
    payload: PaymentType,
    userReq: PayloadAuth,
  ) {
    const payment = new Payment();

    if (!payload.paymentType) {
      throw new HttpException('You must choose a payment method', 400);
    }
    payment.paymentType = payload.paymentType;

    const paymentSaved = await this.paymentRepo.save(payment);

    this.orderService.updatePayment(orderId, paymentSaved.id, userReq);
  }
}
