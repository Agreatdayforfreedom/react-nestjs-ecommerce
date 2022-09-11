import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto, UpdateBookDto } from '../../dtos/book.dto';
import { Book } from '../../entities/book.entity';
import { In, Repository } from 'typeorm';
import { Category } from '../../entities/categories.entity';
import { User } from '../../../user/entities/user.entity';

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
      return await this.bookRepo
        .createQueryBuilder('book')
        .leftJoinAndSelect('book.categories', 'categories')
        .where('book.name like :name', {
          name: `%${query.search}%`,
        })
        .orWhere('book.author like :author', {
          author: `%${query.search}%`,
        })
        .andWhere('book.price > :minPrice', {
          minPrice: query.minPrice,
        })
        .andWhere('book.price < :maxPrice', {
          maxPrice: query.maxPrice,
        })
        .getMany();
    }

    return await this.bookRepo
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.categories', 'categories')
      .where('book.name like :name', {
        name: `%${query.search}%`,
      })
      .orWhere('book.author like :author', {
        author: `%${query.search}%`,
      })
      .getMany();
  }

  async findOne(id: number): Promise<Book> {
    const [book] = await this.bookRepo.find({
      relations: ['metadata'],
      where: { id: id },
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

  async upload(file: Express.Multer.File) {
    console.log(file);
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

    if (book.user.id !== userReq.id) {
      throw new HttpException('You are not owner of this book', 401);
    }
    return await this.bookRepo.delete(id);
  }
}
