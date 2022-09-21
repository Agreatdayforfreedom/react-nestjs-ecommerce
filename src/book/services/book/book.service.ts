import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, SelectQueryBuilder } from 'typeorm';

import { CreateBookDto, UpdateBookDto } from '../../dtos/book.dto';
import { Book } from '../../entities/book.entity';
import { Category } from '../../entities/categories.entity';
import { User } from '../../../user/entities/user.entity';
import { destroyUpload, uploadFromBuffer } from './uploadFromBuffer';
import { PayloadAuth } from 'src/auth/models/token.model';

export interface UserReq {
  id: number;
  username: string;
  role: string;
}

export interface Query {
  search?: string;
  maxPrice?: string;
  minPrice?: string;
  cat?: string;
  order_price?: string;
  order_stock?: string;
  order_news?: string;
}

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  qbFilters(qb: SelectQueryBuilder<Book>, query: Query): void {
    if (query.minPrice && query.maxPrice) {
      qb.where('book.price >= :minPrice', {
        minPrice: parseInt(query.minPrice, 10),
      }).andWhere('book.price <= :maxPrice', {
        maxPrice: parseInt(query.maxPrice, 10),
      });
    }
    if (query.order_news) {
      qb.orderBy('book.createdAt', `${query.order_news as 'DESC' | 'ASC'}`);
    }
    if (query.order_price) {
      qb.orderBy('book.price', `${query.order_price as 'DESC' | 'ASC'}`);
    }
    if (query.order_stock) {
      qb.orderBy('book.stock', `${query.order_stock as 'DESC' | 'ASC'}`);
    }
  }

  async findAllFilter(query: Query): Promise<Book[]> {
    let qb = this.bookRepo.createQueryBuilder('book');
    if (query.search) {
      qb.where('book.name like :name', {
        name: `%${query.search}%`,
      }).orWhere('book.author like :author', {
        author: `%${query.search}%`,
      });
    }
    this.qbFilters(qb, query);

    return await qb.getMany();
  }

  async findByCategory(query: Query) {
    let qb = this.bookRepo
      .createQueryBuilder('book')
      .innerJoinAndSelect('book.categories', 'categories')
      .where('categories.id = :id', { id: query.cat.at(-1) });
    this.qbFilters(qb, query);
    return await qb.getMany();
  }

  async findOne(id: number): Promise<Book> {
    const [book] = await this.bookRepo.find({
      relations: {
        categories: true,
        metadata: true,
      },
      where: { id: id },
      order: { id: 'ASC' },
      //default order should be most relevant
    });

    return book;
  }

  async create(payload: CreateBookDto, userReq: PayloadAuth): Promise<Book> {
    const book = this.bookRepo.create(payload);

    const [user] = await this.userRepo.find({ where: { id: userReq.id } });

    if (!user) throw new HttpException('Error, you need to be registered', 401);

    book.user = user;

    if (payload.categories) {
      const categories = await this.categoryRepo.find({
        where: { id: In([...payload.categories]) },
      });
      book.categories = categories;
    }
    return await this.bookRepo.save(book);
  }

  async upload(id: number, file: Express.Multer.File) {
    try {
      // Upload the image
      const [book] = await this.bookRepo.find({ where: { id: id } });
      if (!book) {
        throw new Error('error');
      }
      if (book.image.charAt(0) === 'h') {
        //if it is update it destroys the old image
        destroyUpload(book);
      }

      const result: any = await uploadFromBuffer(file.buffer);

      book.image = result.secure_url;
      return this.bookRepo.save(book);
    } catch (error) {
      console.error(error);
    }
  }

  async update(id: number, payload: UpdateBookDto, userReq: PayloadAuth) {
    const [book] = await this.bookRepo.find({
      relations: ['user'],
      where: { id: id },
    });
    if (!book) throw new HttpException('book not found', 404);

    if (book.user.id !== userReq.id) {
      throw new HttpException('You are not owner of this book', 401);
    }
    const bookUpdated = this.bookRepo.merge(book, payload);
    return await this.bookRepo.save(bookUpdated);
  }

  async delete(id: number, userReq: PayloadAuth) {
    const [book] = await this.bookRepo.find({
      relations: { user: true },
      where: { id: id },
    });
    if (!book) throw new HttpException('book not found', 404);

    //deleting image
    destroyUpload(book);

    if (book.user.id !== userReq.id) {
      throw new HttpException('You are not owner of this book', 401);
    }
    return await this.bookRepo.delete(id);
  }
}
