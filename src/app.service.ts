import { Inject, Injectable } from '@nestjs/common';
import { REDIS_CLIENT } from './database/redisFactory';
import { Redis } from 'ioredis';

@Injectable()
export class AppService {
  async getHello() {
    return "Work!";
  }
}
