import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart_item } from '../../entities/cart_item.entity';
import { Repository } from 'typeorm';
import { Cart } from '../../entities/cart.entity';
import { Book } from '../../../book/entities/book.entity';
import { UpdateCartDto } from 'src/user/dtos/cart.dto';
import { PayloadAuth } from 'src/auth/models/token.model';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(Cart_item) private cart_itemRepo: Repository<Cart_item>,
    @InjectRepository(Book) private bookRepo: Repository<Book>,
  ) {}

  async getCart(userReq: PayloadAuth): Promise<Cart> {
    console.log(userReq);
    const [cart] = await this.cartRepo.find({
      relations: {
        cItem: {
          book: true,
        },
      },
      where: { id: userReq.cart.id },
    });
    return cart;
  }

  async getCartItem(userReq: PayloadAuth): Promise<Cart_item[]> {
    return await this.cart_itemRepo.find({
      relations: {
        cart: true,
        book: true,
      },
      where: {
        cart: {
          id: userReq.cart.id,
        },
      },
    });
  }

  async addToCart(payload: any, userReq: PayloadAuth): Promise<Cart_item> {
    console.log(userReq, 'addcart');
    const [cart] = await this.cartRepo.find({
      relations: ['user'],
      where: { user: { id: userReq.id } },
    });

    if (!cart) throw new HttpException('Internal server error', 500);

    const [item] = await this.bookRepo.find({ where: { id: payload.bookId } });

    if (!item) throw new HttpException('Book not found', 404);

    const [cart_item] = await this.cart_itemRepo.find({
      relations: ['book'],
      where: { book: { id: payload.bookId } },
    });

    if (cart_item === undefined) {
      const newItem = new Cart_item();
      newItem.book = item;
      newItem.cart = cart;
      newItem.quantity = 1;
      return await this.cart_itemRepo.save(newItem);
    } else {
      if (cart_item.book.stock <= cart_item.quantity)
        throw new HttpException('There is not enough stock', 400);

      cart_item.quantity++;
      return await this.cart_itemRepo.save(cart_item);
    }
  }

  async updateItemCart(
    payload: UpdateCartDto,
    id: number,
    userReq: PayloadAuth,
  ): Promise<Cart_item> {
    const [cart_item] = await this.cart_itemRepo.find({
      relations: {
        book: {
          user: true,
        },
      },
      where: { id: id },
    });

    if (cart_item.book.user.id.toString() !== userReq.id.toString()) {
      throw new HttpException('You are not the owner', 400);
    }

    cart_item.quantity = payload.quantity;

    //check if thare is enough stock
    if (cart_item.book.stock < payload.quantity) {
      throw new HttpException('There is not enough stock', 400);
    }

    return await this.cart_itemRepo.save(cart_item);
  }

  async deleteItemCart(id: number, userReq: PayloadAuth): Promise<void> {
    const [cart_item] = await this.cart_itemRepo.find({
      relations: {
        book: {
          user: true,
        },
      },
      where: { id: id },
    });
    if (cart_item.book.user.id.toString() !== userReq.id.toString()) {
      throw new HttpException('You are not the owner', 400);
    }

    await this.cart_itemRepo.delete(id);
  }
}
