import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, In, Repository, SelectQueryBuilder } from 'typeorm';

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

enum Order {
  priceASC = 'price%ASC',
  priceDESC = 'price%DESC',
  stock = 'stock',
  news = 'new',
}

export interface Query {
  search?: string;
  maxPrice?: string;
  minPrice?: string;
  cat?: string;
  order?: Order;
}

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  private qbFilters(qb: SelectQueryBuilder<Book>, query: Query): void {
    if (query.search) {
      qb.where(
        new Brackets((qb) => {
          qb.where('LOWER(book.name) like :name', {
            name: `%${query.search.toLocaleLowerCase()}%`,
          }).orWhere('LOWER(book.author) like :author', {
            author: `%${query.search.toLocaleLowerCase()}%`,
          });
        }),
      );
    }
    if (query.order === Order.news) {
      qb.where('book.isNew = :new', { new: true });
    }
    if (query.minPrice && query.maxPrice) {
      qb.andWhere(
        new Brackets((qb) => {
          qb.where('book.price >= :minPrice', {
            minPrice: parseInt(query.minPrice, 10),
          }).andWhere('book.price <= :maxPrice', {
            maxPrice: parseInt(query.maxPrice, 10),
          });
        }),
      );
    }
    if (query.order === Order.news || !query.order) {
      const order = 'DESC';
      qb.orderBy('book.createdAt', `${order as 'DESC' | 'ASC'}`);
    }
    if (query.order === Order.priceDESC || query.order === Order.priceASC) {
      const order = query.order.split('%')[1];
      qb.orderBy('book.price', `${order as 'DESC' | 'ASC'}`);
    }
    if (query.order === Order.stock) {
      const order = 'DESC';
      qb.orderBy('book.stock', `${order as 'DESC' | 'ASC'}`);
    }
  }

  async findAllFilter(query: Query): Promise<Book[]> {
    let qb = this.bookRepo.createQueryBuilder('book');

    this.qbFilters(qb, query);

    return await qb.getMany();
  }

  async findByCategory(query: Query) {
    let qb = this.bookRepo
      .createQueryBuilder('book')
      .innerJoinAndSelect('book.categories', 'categories');
    if (query.cat) {
      qb.where('categories.id = :id', { id: query.cat.at(-1) });
    }
    this.qbFilters(qb, query);
    const cat = query.cat.slice(0, -1);
    return {
      cat,
      books: await qb.getMany(),
    };
  }

  async findBestSellers(query: { take: number }) {
    return await this.bookRepo.find({
      order: {
        totalSold: 'DESC',
      },
      take: query.take || 100,
    });
  }

  async findOne(id: number): Promise<Book> {
    const [book] = await this.bookRepo.find({
      relations: {
        categories: true,
        messages: {
          user: true,
        },
        // metadata: true,
      },
      where: { id: id },
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
    if (payload.categories) {
      const categories = await this.categoryRepo.find({
        where: { id: In([...payload.categories]) },
      });
      book.categories = categories;
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
