import { Product } from '../../product/entities/product.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../common/base.entity';
import { Message } from '../../product/entities/message.entity';

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

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];
}
