import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto, UpdateCustomerDto } from '../../dtos/customers.dto';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { Customers } from '../../entities/customers.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customers) private customersRepo: Repository<Customers>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async findCustomer(req: any) {
    return await this.customersRepo.find({
      relations: ['user'],
      where: { user: { id: req.user.id } },
    });
  }

  async create(payload: CreateCustomerDto, req: any) {
    const customer = this.customersRepo.create(payload);

    const [user] = await this.userRepo.find({ where: { id: req.user.id } });
    customer.user = user;
    return await this.customersRepo.save(customer);
  }

  //send req and validate if he is owner
  async update(payload: UpdateCustomerDto, id: number) {
    const [customer] = await this.customersRepo.find({ where: { id: id } });
    const customerUpdated = this.customersRepo.merge(customer, payload);
    return await this.customersRepo.save(customerUpdated);
  }

  async delete(id: number) {
    return await this.customersRepo.delete(id);
  }
}
