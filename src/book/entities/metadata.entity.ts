import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from './book.entity';

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

  @OneToOne(() => Book, (book) => book.metadata, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  book: Book;
}
