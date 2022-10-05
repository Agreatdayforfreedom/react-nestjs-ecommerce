import { Base } from '../../common/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Orders } from './orders.entity';

@Entity()
export class Shipper extends Base {
  @Column()
  company: string;

  @Column()
  phone: string;

  @ManyToOne(() => Orders, (order) => order.shipper)
  order: Orders[];
}
