import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Base } from '../../common/base.entity';
import { Customers } from './customers.entity';
import { Order_details } from './order_details.entity';
import { fakeid } from '../../common/fakeid';
import { Payment } from './payment.entity';
import { Shipper } from './shipper.entity';

export enum Enum_PurchaseStatus {
  PENDING_PAYMENT_METHOD = 'PENDING_PAYMENT_METHOD',
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  PURCHASE = 'PURCHASE',
  CANCELLED = 'CANCELLED',
}

@Entity()
export class Orders extends Base {
  @Column({ default: fakeid(21) })
  num_order: string;

  @Column({ default: Enum_PurchaseStatus.PENDING_PAYMENT_METHOD })
  purchase_status: Enum_PurchaseStatus;

  @OneToOne(() => Payment, (payment) => payment.order)
  @JoinColumn()
  payment: Payment;

  @OneToMany(() => Order_details, (order_details) => order_details.orders)
  order_details: Order_details[];

  @ManyToOne(() => Shipper, (shipper) => shipper.order, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  shipper: Shipper;

  @ManyToOne(() => Customers, (customer) => customer.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  customer: Customers;
}
