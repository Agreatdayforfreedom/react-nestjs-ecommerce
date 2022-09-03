import { Base } from '../../common/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Message extends Base {
  @Column()
  message: string;

  // product
  @ManyToOne(() => Product, (product) => product.messages)
  product: Product;

  // emitter
  @ManyToOne(() => User, (user) => user.messages)
  user: User;
}
