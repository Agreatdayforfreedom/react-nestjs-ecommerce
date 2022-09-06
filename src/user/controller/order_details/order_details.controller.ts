import { Controller, Post } from '@nestjs/common';

@Controller('order-details')
export class OrderDetailsController {
  @Post()
  create() {}
}
