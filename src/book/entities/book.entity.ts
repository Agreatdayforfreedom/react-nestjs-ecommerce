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
// import { Metadata } from './metadata.entity';
import { Message } from './message.entity';
import { Cart_item } from '../../user/entities/cart_item.entity';
/*image,
  name,
  author,
  format,
  book_depository_stars,
  price,
  currency,
  old_price,
  isbn,
  category,
  img_paths;
*/

@Entity()
export class Book extends Base {
  @Column()
  name: string;

  @Column({ length: 255, default: 'Without review yet' })
  review?: string; //todo:

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column()
  author: string;

  @Column()
  isbn: string;

  @Column({ default: 'Unknown' })
  format: string;

  @Column({ default: 'without image' })
  image?: string;

  @Column({ default: true })
  isNew: boolean;

  @Column({ default: 0 })
  totalSold: number;

  @Column()
  stars: number;

  // @OneToOne(() => Metadata, (metadata) => metadata.book)
  // metadata: Metadata;

  @ManyToOne(() => User, (user) => user.books, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @OneToMany(() => Message, (message) => message.book)
  messages: Message[];

  @OneToMany(() => Cart_item, (cItem) => cItem.book)
  cItem: Cart_item[];

  @ManyToMany(() => Category, (category) => category.books, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'books_categories',
    joinColumn: {
      name: 'book_id',
    },
    inverseJoinColumn: {
      name: 'category_id',
    },
  })
  categories: Category[];
}
