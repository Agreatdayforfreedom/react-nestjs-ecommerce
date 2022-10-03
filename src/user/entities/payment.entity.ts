import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Orders } from './orders.entity';

export enum Enum_PaymentType {
  LIBSCREDITS = 'LIBSCREDITS',
  //paypal, strapi, etc
}

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  paymentType: Enum_PaymentType;

  @OneToOne(() => Orders, (orders) => orders.payment)
  order: Orders;
}
