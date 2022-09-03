import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Category } from './categories.entity';
import { Base } from '../../common/base.entity';
import { Metadata } from './metadata.entity';
import { Message } from './message.entity';

//book
@Entity()
export class Product extends Base {
  @Column({ length: 100 })
  name: string;

  @Column({ length: 255, default: 'Without review yet' })
  review?: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column({ length: 60 })
  author: string;

  @OneToOne(() => Metadata, (metadata) => metadata.product)
  metadata: Metadata;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @OneToMany(() => Message, (message) => message.product)
  messages: Message[];

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({
    name: 'products_categories',
    joinColumn: {
      name: 'product_id',
    },
    inverseJoinColumn: {
      name: 'category_id',
    },
  })
  categories: Category[];
}
