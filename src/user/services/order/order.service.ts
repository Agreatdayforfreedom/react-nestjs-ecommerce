import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from '../../entities/customers.entity';
import { Repository } from 'typeorm';
import { Orders } from '../../entities/orders.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders) private orderRepo: Repository<Orders>,
    @InjectRepository(Customers) private customerRepo: Repository<Customers>,
  ) {}

  async findAll(): Promise<Orders[]> {
    return this.orderRepo.find();
  }

  async create(req: any): Promise<Orders> {
    const order = new Orders();
    const [customer] = await this.customerRepo.find({
      relations: ['user'],
      where: { user: { id: req.user.id } },
    });
    if (!customer) {
      throw new HttpException('Complete your data', 400);
    }
    order.customer = customer;
    return await this.orderRepo.save(order);
  }
}
