import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Metadata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pages: number;

  @Column()
  publisher: string;

  @Column()
  language: string;

  @OneToOne(() => Product, (product) => product.metadata)
  @JoinColumn()
  product: Product;
}
