import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from '../../entities/customers.entity';
import { Repository } from 'typeorm';
import { Enum_PurchaseStatus, Orders } from '../../entities/orders.entity';
import { Cart } from '../../entities/cart.entity';
import { Order_details } from '../../entities/order_details.entity';
import { Cart_item } from '../../entities/cart_item.entity';
import { PayloadAuth } from '../../../auth/models/token.model';
import { Payment } from '../../entities/payment.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders) private orderRepo: Repository<Orders>,
    @InjectRepository(Customers) private customerRepo: Repository<Customers>,
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(Cart_item) private cart_itemRepo: Repository<Cart_item>,
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
    @InjectRepository(Order_details)
    private order_detailsRepo: Repository<Order_details>,
  ) {}

  async findAll(userReq: PayloadAuth): Promise<Orders[]> {
    return this.orderRepo.find({
      relations: {
        customer: {
          user: true,
        },
        order_details: { book: true },
      },
      where: { customer: { user: { id: userReq.id } } },
    });
  }

  async findOne(id: number, userReq: PayloadAuth): Promise<Orders> {
    const [order] = await this.orderRepo.find({
      relations: {
        customer: {
          user: true,
        },
        payment: true,
        order_details: {
          book: true,
        },
      },
      where: {
        id: id,
        customer: {
          user: {
            id: userReq.id,
          },
        },
      },
    });
    return order;
  }

  async create(userReq: PayloadAuth) {
    const order = new Orders();

    const [cart] = await this.cartRepo.find({
      relations: {
        user: true,
        cItem: {
          book: true,
        },
      },
      where: { user: { id: userReq.id } },
    });

    if (cart.cItem.length === 0) {
      throw new HttpException('The Shipping cart is empty', 400);
    }

    const [customer] = await this.customerRepo.find({
      relations: ['user'],
      where: { user: { id: userReq.id } },
    });

    if (!customer) {
      throw new HttpException('Complete your data', 400);
    }

    order.customer = customer;

    const { id } = await this.orderRepo.save(order);

    const [orderBrought] = await this.orderRepo.find({
      relations: {
        customer: {
          user: true,
        },
      },
      where: {
        customer: { user: { id: userReq.id } },
        id: id,
      },
    });

    // insert one by one in order_details from the cart
    cart.cItem.forEach(async (item) => {
      const order_details = new Order_details();
      order_details.book = item.book;
      order_details.orders = orderBrought;
      order_details.quantity = item.quantity;
      await this.cart_itemRepo.delete(item.id);
      await this.order_detailsRepo.save(order_details);
    });
    return orderBrought;
  }

  async updatePayment(
    orderId: number,
    paymentId: number,
    userReq: PayloadAuth,
  ) {
    const order = await this.findOne(orderId, userReq);

    const [payment] = await this.paymentRepo.find({
      where: {
        id: paymentId,
      },
    });

    order.payment = payment;
    order.purchase_status = Enum_PurchaseStatus.PENDING_PAYMENT;
    await this.orderRepo.save(order);
  }
}
