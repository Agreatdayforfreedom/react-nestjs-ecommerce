import { Book } from '../../book/entities/book.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../common/base.entity';
import { Message } from '../../book/entities/message.entity';

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

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @OneToMany(() => Book, (book) => book.user)
  books: Book[];
}
