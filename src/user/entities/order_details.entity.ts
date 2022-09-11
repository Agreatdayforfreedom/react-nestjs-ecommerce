import { Book } from '../../book/entities/book.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Orders } from './orders.entity';

@Entity()
export class Order_details {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Orders, (order) => order.order_details, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  orders: Orders;

  @ManyToOne(() => Book, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  book: Book;
}
