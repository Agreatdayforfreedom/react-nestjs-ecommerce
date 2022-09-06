import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from '../../entities/customers.entity';
import { Repository } from 'typeorm';
import { Orders } from '../../entities/orders.entity';
import { Cart } from '../../entities/cart.entity';
import { Order_details } from '../../entities/order_details.entity';
import { Cart_item } from '../../entities/cart_item.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders) private orderRepo: Repository<Orders>,
    @InjectRepository(Customers) private customerRepo: Repository<Customers>,
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(Cart_item) private cart_itemRepo: Repository<Cart_item>,
    @InjectRepository(Order_details)
    private order_detailsRepo: Repository<Order_details>,
  ) {}

  async findAll(req: any): Promise<Orders[]> {
    return this.orderRepo.find({
      relations: {
        customer: {
          user: true,
        },
      },
      where: { customer: { user: req.user.id } },
    });
  }

  async findOne(id: number, req: any): Promise<Orders> {
    return await this.orderRepo.find({
      relations: {
        customer: true,
        order_details: true,
      },
      where: { id: id },
    })[0];
  }

  async create(req: any) {
    const order = new Orders();

    const [customer] = await this.customerRepo.find({
      relations: ['user'],
      where: { user: { id: req.user.id } },
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
      where: { customer: { user: { id: req.user.id } }, id: id },
    });

    const [cart] = await this.cartRepo.find({
      relations: {
        user: true,
        cItem: {
          book: true,
        },
      },
      where: { user: { id: req.user.id } },
    });

    if (cart.cItem.length === 0) {
      throw new HttpException('The Shipping cart is empty', 400);
    }
    // insert one by one in order_details from the cart
    cart.cItem.forEach(async (item) => {
      const order_details = new Order_details();
      order_details.book = item.book;
      order_details.orders = orderBrought;
      order_details.quantity = item.quantity;
      await this.cart_itemRepo.delete(item.id);
      return await this.order_detailsRepo.save(order_details);
    });
  }
}
