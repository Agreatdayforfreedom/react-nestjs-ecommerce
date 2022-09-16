import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Base } from '../../common/base.entity';
import { Customers } from './customers.entity';
import { Order_details } from './order_details.entity';
import { fakeid } from '../../common/fakeid';

@Entity()
export class Orders extends Base {
  @Column({ default: fakeid(21) })
  num_order: string;

  @OneToMany(() => Order_details, (order_details) => order_details.orders)
  order_details: Order_details[];

  @ManyToOne(() => Customers, (customer) => customer.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  customer: Customers;
}
