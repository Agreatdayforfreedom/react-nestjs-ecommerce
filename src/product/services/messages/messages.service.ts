import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../../entities/message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from '../../../product/dtos/message.dto';
import { Product } from '../../../product/entities/product.entity';
import { User } from '../../../user/entities/user.entity';

export interface ArrMessageAndLength<T, K> {
  readonly length: T;
  readonly messages: K[];
}

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messageRepo: Repository<Message>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  public async findAll(
    id: number,
    query: any,
  ): Promise<ArrMessageAndLength<number, Message>> {
    // return await this.messageRepo.find({
    //   relations: ['product'],
    //   where: { product: { id: id } },
    //   take: query.limit,
    // });

    const messages = await this.messageRepo
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.product', 'product')
      .where('message.product = :productId', { productId: id })
      .limit(query.limit)
      .getMany();
    return { length: messages.length, messages };
  }

  async create(
    payload: CreateMessageDto,
    productId: number,
    req: any,
  ): Promise<Message> {
    const message = this.messageRepo.create(payload);

    const [findUser] = await this.userRepo.find({
      where: { id: req.user.id },
    });
    const [findProduct] = await this.productRepo.find({
      where: { id: productId },
    });

    if (!findUser || !findProduct)
      throw new HttpException('There was an error', 400);

    message.user = findUser;
    message.product = findProduct;
    return await this.messageRepo.save(message);
  }

  async update(
    payload: CreateMessageDto,
    messageId: number,
    req: any,
  ): Promise<Message> {
    const [message] = await this.messageRepo.find({
      relations: ['user'],
      where: { id: messageId },
    });

    if (message.user.id.toString() !== req.user.id.toString())
      throw new HttpException('You are not the owner of the message', 401);

    const messageUpdated = this.messageRepo.merge(message, payload);

    return await this.messageRepo.save(messageUpdated);
  }

  async delete(messageId: number, req: any): Promise<void> {
    const [message] = await this.messageRepo.find({
      relations: ['user'],
      where: { id: messageId },
    });

    if (message.user.id.toString() !== req.user.id.toString())
      throw new HttpException('You are not the owner of the message', 401);

    await this.messageRepo.delete(messageId);
  }
}
