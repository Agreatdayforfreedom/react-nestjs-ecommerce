import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          type: 'postgres',
          host: configService.db.host,
          port: configService.db.port,
          username: configService.db.username,
          password: configService.db.password,
          database: configService.db.database,
          autoLoadEntities: true, // run migrations
          synchronize: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
