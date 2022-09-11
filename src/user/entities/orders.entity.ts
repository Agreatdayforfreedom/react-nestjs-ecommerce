import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { Base } from '../../common/base.entity';
import { Customers } from './customers.entity';
import { Order_details } from './order_details.entity';

@Entity()
export class Orders extends Base {
  @OneToMany(() => Order_details, (order_details) => order_details.orders)
  order_details: Order_details[];

  @ManyToOne(() => Customers, (customer) => customer.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  customer: Customers;
}
