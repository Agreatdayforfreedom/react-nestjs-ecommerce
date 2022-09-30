import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../../entities/message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from '../../dtos/message.dto';
import { Book } from '../../entities/book.entity';
import { User } from '../../../user/entities/user.entity';
import { PayloadAuth } from '../../../auth/models/token.model';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messageRepo: Repository<Message>,
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async findAll(id: number, query: any): Promise<Message[]> {
    return await this.messageRepo
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.book', 'book')
      .leftJoinAndSelect('message.user', 'user')
      .where('message.book = :bookId', { bookId: id })
      .limit(query.limitAll)
      .orderBy('message.createdAt', 'ASC')
      .getMany();
  }

  async findOwnQuestions(
    id: number,
    userReq: PayloadAuth,
    query: any,
  ): Promise<Message[]> {
    return await this.messageRepo.find({
      relations: {
        book: true,
        user: true,
      },
      where: {
        book: { id: id },
        user: { id: userReq.id },
      },
      take: query.limitOwn,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async create(
    payload: CreateMessageDto,
    bookId: number,
    userReq: PayloadAuth,
  ): Promise<Message> {
    const message = this.messageRepo.create(payload);

    if (!payload.message || payload.message.length < 6) {
      throw new HttpException('You must write at least 6 characters', 400);
    }

    const limitToThreePerUser = await this.messageRepo.find({
      relations: {
        user: true,
        book: true,
      },
      where: {
        user: {
          id: userReq.id,
        },
        book: {
          id: bookId,
        },
      },
    });

    if (limitToThreePerUser.length === 3) {
      throw new HttpException('You have already send 3 questions!', 400);
    }

    const [findUser] = await this.userRepo.find({
      where: { id: userReq.id },
    });
    const [findBook] = await this.bookRepo.find({
      where: { id: bookId },
    });

    if (!findUser || !findBook)
      throw new HttpException('There was an error', 400);

    message.user = findUser;
    message.book = findBook;
    return await this.messageRepo.save(message);
  }

  async update(
    payload: CreateMessageDto,
    messageId: number,
    userReq: PayloadAuth,
  ): Promise<Message> {
    if (!payload.message || payload.message.length < 6) {
      throw new HttpException('You must write at least 6 characters', 400);
    }

    const [message] = await this.messageRepo.find({
      relations: ['user'],
      where: { id: messageId },
    });

    if (message.user.id.toString() !== userReq.id.toString())
      throw new HttpException('You are not the owner of the message', 401);

    const messageUpdated = this.messageRepo.merge(message, payload);

    return await this.messageRepo.save(messageUpdated);
  }

  async delete(messageId: number, userReq: PayloadAuth): Promise<void> {
    const [message] = await this.messageRepo.find({
      relations: ['user'],
      where: { id: messageId },
    });

    if (message.user.id.toString() !== userReq.id.toString())
      throw new HttpException('You are not the owner of the message', 401);

    await this.messageRepo.delete(messageId);
  }
}
