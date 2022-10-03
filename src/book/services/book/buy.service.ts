import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PayloadAuth } from '../../../auth/models/token.model';
import { User } from '../../../user/entities/user.entity';
import { DataSource, In, Repository } from 'typeorm';
import { Book } from '../../entities/book.entity';
import {
  Enum_PurchaseStatus,
  Orders,
} from '../../../user/entities/orders.entity';

@Injectable()
export class BuyService {
  constructor(
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Orders) private orderRepo: Repository<Orders>,
    private dataSource: DataSource,
  ) {}

  async buyBook(orderId: number, userReq: PayloadAuth): Promise<void> {
    const [user] = await this.userRepo.find({
      where: {
        id: userReq.id,
      },
    });

    const [order] = await this.orderRepo.find({
      relations: {
        order_details: {
          book: true,
        },
      },
      where: {
        id: orderId,
      },
    });

    type BookOrderData = {
      id: number;
      qty: number;
    };
    //save the id items
    const bookIds: number[] = order.order_details.map((o) => o.book.id);
    const booksOrderData: BookOrderData[] = order.order_details.map((o) => ({
      id: o.book.id,
      qty: o.quantity,
    }));
    console.log(bookIds);

    const books = await this.bookRepo
      .createQueryBuilder('book')
      .where('book.id IN (:...ids)', { ids: bookIds })
      .getMany();

    if (!order || !user)
      throw new HttpException(
        'Something went wrong, please refresh the page',
        400,
      );

    const total: number = order.order_details
      .map((o) => o.book.price)
      .reduce((p, c) => p + c, 0);

    if (!total)
      throw new HttpException(
        'Something went wrong, please refresh the page',
        400,
      );

    if (total > user.LIBScredits) {
      throw new HttpException('insufficient credits!', 400);
    }

    //remove user credits
    user.LIBScredits = user.LIBScredits - total;
    //reduce books stock
    const dataToUpdate = [];
    for (let i = 0; i < books.length; i++) {
      for (let j = 0; j < booksOrderData.length; j++) {
        if (books[i].id === booksOrderData[j].id) {
          dataToUpdate.push({
            id: books[i].id,
            stock: books[i].stock - booksOrderData[j].qty,
            totalSold: books[i].totalSold + booksOrderData[j].qty,
          });
        }
      }
    }
    //order purchase
    order.purchase_status = Enum_PurchaseStatus.PURCHASE;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await Promise.all([
        await queryRunner.manager.save(user),
        dataToUpdate.forEach(async (book) => {
          await queryRunner.manager
            .createQueryBuilder()
            .update(Book)
            .set(book)
            .where('id = :id', { id: book.id })
            .execute();
        }),
        await queryRunner.manager.save(order),
      ]);
      await queryRunner.commitTransaction();
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
