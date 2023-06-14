import { FactoryProvider } from '@nestjs/common';
import { Redis } from 'ioredis';

export const REDIS_CLIENT = Symbol('REDIS_CLIENT');

export const RedisFactory: FactoryProvider<Promise<Redis>> = {
  provide: REDIS_CLIENT,
  useFactory: async () => {
    const c = new Redis({ port: 6379, host: '127.0.0.1' });

    return c;
  },
};
