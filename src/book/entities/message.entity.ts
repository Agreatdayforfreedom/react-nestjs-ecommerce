import { Base } from '../../common/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Book } from './book.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Message extends Base {
  @Column()
  message: string;

  // product
  @ManyToOne(() => Book, (book) => book.messages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  book: Book;

  // emitter
  @ManyToOne(() => User, (user) => user.messages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;
}
