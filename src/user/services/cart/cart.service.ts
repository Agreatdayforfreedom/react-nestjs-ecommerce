import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart_item } from '../../entities/cart_item.entity';
import { Repository } from 'typeorm';
import { Cart } from '../../entities/cart.entity';
import { Book } from '../../../book/entities/book.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(Cart_item) private cart_itemRepo: Repository<Cart_item>,
  ) {}

  async getCart(req: any): Promise<Cart[]> {
    console.log(req.user);
    return await this.cartRepo.find({
      relations: ['user', 'cItem'],
      where: { user: { id: req.user.id } },
    });
  }

  // async addToCart(payload: any, req: any) {
  //   const [cart] = await this.cartRepo.find({
  //     relations: ['user'],
  //     where: { user: { id: req.user.id } },
  //   });

  //   const [item] = await this.bookRepo.find({ where: { id: payload.bookId } });

  //   const newItem = new Cart_item();
  //   newItem.book = item;
  //   newItem.cart = cart;
  //   newItem.quantity = 1;

  //   return await this.cart_itemRepo.save(newItem);
  // }
  addToCart(a: any, b: any) {}
}
