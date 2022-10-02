import { Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PayloadAuth } from '../../../auth/models/token.model';
import { User } from '../../../auth/decorators/user.decorator';
import { BuyService } from '../../services/book/buy.service';

@Controller('buy')
export class BuyController {
  constructor(private buyService: BuyService) {}

  @Post(':id')
  buyBook(@Param('id', ParseIntPipe) id: number, @User() userReq: PayloadAuth) {
    return this.buyService.buyBook(id, userReq);
  }
}
