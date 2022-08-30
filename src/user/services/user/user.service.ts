import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/user/dtos/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  //todo: check this
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
    return await this.userRepo.save(user);
  }
}
