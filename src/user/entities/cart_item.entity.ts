import { Book } from '../../book/entities/book.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from './cart.entity';

@Entity()
export class Cart_item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('smallint', { nullable: false })
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.cItem, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'cartid' })
  cart: Cart;

  @ManyToOne(() => Book, (book) => book.cItem, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'productid' })
  book: Book;
}
