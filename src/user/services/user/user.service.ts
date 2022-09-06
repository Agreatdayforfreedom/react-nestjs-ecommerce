import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../dtos/user.dto';
import { Cart } from '../../entities/cart.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
  ) {}

  async findOne(username?: string, email?: string): Promise<User[]> {
    return await this.userRepo.find({
      where: [{ username: username }, { email: email }],
    });
  }

  async findOneU(id: number): Promise<User[]> {
    return await this.userRepo.find({
      where: { id: id },
    });
  }

  async create(body: CreateUserDto) {
    const user = this.userRepo.create(body);
    const cart = new Cart();
    cart.user = user;

    const [userSaved, { user: userCart, cItem, ...remainder }] =
      await Promise.all([
        await this.userRepo.save(user),
        await this.cartRepo.save(cart),
      ]);

    return {
      user: userSaved,
      cart: remainder,
    };
  }
}
