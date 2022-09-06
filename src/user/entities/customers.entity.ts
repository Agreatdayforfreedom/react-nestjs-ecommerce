import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { Base } from '../../common/base.entity';
import { Orders } from './orders.entity';
import { User } from './user.entity';

@Entity()
export class Customers extends Base {
  @Column({ length: 45 })
  firstName: string;

  @Column({ length: 45 })
  lastName: string;

  @Column({ length: 45 })
  phone: string;

  @Column({ length: 45 })
  city: string;

  @Column({ length: 45 })
  country: string;

  @Column({ length: 45 })
  state: string;

  @OneToOne(() => User, (user) => user.customer)
  user: User;

  @OneToMany(() => Orders, (order) => order.customer)
  orders: Orders[];
}
