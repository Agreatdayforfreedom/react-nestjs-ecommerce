import { Book } from '../../book/entities/book.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Orders } from './orders.entity';

@Entity()
export class Order_details {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Orders, (order) => order.order_details)
  orders: Orders;

  @ManyToOne(() => Book)
  book: Book;
}
