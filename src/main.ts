import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as responseTime from 'response-time';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(responseTime());
  await app.listen(3000);
}
bootstrap();
