import { Book } from '../../book/entities/book.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Base } from '../../common/base.entity';
import { Message } from '../../book/entities/message.entity';
import { Customers } from './customers.entity';
import { Cart } from './cart.entity';

enum Role_Enum {
  SELLER = 'seller',
  USER = 'user',
}

@Entity()
export class User extends Base {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: Role_Enum.USER, enum: Role_Enum })
  role?: string;

  @OneToOne(() => Customers, (customer) => customer.user)
  customer: Customers;

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @OneToMany(() => Book, (book) => book.user)
  books: Book[];
}
