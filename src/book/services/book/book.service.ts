import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Brackets, FindOptionsWhere, In, Repository } from 'typeorm';

import { CreateBookDto, UpdateBookDto } from '../../dtos/book.dto';
import { Book } from '../../entities/book.entity';
import { Category } from '../../entities/categories.entity';
import { User } from '../../../user/entities/user.entity';
import { destroyUpload, uploadFromBuffer } from './uploadFromBuffer';

export interface UserReq {
  //move to another file
  id: number;
  username: string;
  role: string;
}

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<Book[]> {
    return await this.bookRepo.find({
      relations: ['categories'],
    });
  }
  async findAllFilter(query: any): Promise<Book[]> {
    if (query.minPrice && query.maxPrice) {
      let qb = this.bookRepo
        .createQueryBuilder('book')
        .where('book.price >= :minPrice', {
          minPrice: parseInt(query.minPrice, 10),
        })
        .andWhere('book.price <= :maxPrice', {
          maxPrice: parseInt(query.maxPrice, 10),
        });
      if (query.order_price) {
        qb.orderBy('book.price', `${query.order_price as 'DESC' | 'ASC'}`);
      }
      if (query.order_stock) {
        qb.orderBy('book.stock', `${query.order_stock as 'DESC' | 'ASC'}`);
      }
      return await qb.getMany();
    }

    const qb = this.bookRepo
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.categories', 'categories')
      .where('book.name like :name', {
        name: `%${query.search}%`,
      })
      .orWhere('book.author like :author', {
        author: `%${query.search}%`,
      });
    if (query.order_price) {
      qb.orderBy('book.price', `${query.order_price as 'DESC' | 'ASC'}`);
    }
    if (query.order_stock) {
      qb.orderBy('book.stock', `${query.order_stock as 'DESC' | 'ASC'}`);
    }
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

  async create(payload: CreateBookDto, req: any): Promise<Book> {
    const book = this.bookRepo.create(payload);

    const userReq = req.user as UserReq;

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

  async update(id: number, payload: UpdateBookDto, req: any) {
    const userReq = req.user as UserReq;

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

  async delete(id: number, req: any) {
    const userReq = req.user as { id: number; username: string; role: string };

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
