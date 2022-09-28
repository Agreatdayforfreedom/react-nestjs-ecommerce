import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MessagesService } from '../../services/messages/messages.service';
import { CreateMessageDto } from '../../dtos/message.dto';
import { Public } from '../../../auth/decorators/public.decorator';
import { PayloadAuth } from '../../../auth/models/token.model';
import { User } from '../../../auth/decorators/user.decorator';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Public()
  @Get(':id')
  findAll(@Param('id', ParseIntPipe) id: number, @Query() query?: any) {
    return this.messageService.findAll(id, query);
  }

  @Get('own/:id')
  findOwnReviews(
    @Param('id', ParseIntPipe) id: number,
    @User() userReq: PayloadAuth,
    @Query() query: any,
  ) {
    return this.messageService.findOwnReviews(id, userReq, query);
  }

  @Post(':id')
  create(
    @Body() payload: CreateMessageDto,
    @Param('id', ParseIntPipe) id: number,
    @User() userReq: PayloadAuth,
  ) {
    return this.messageService.create(payload, id, userReq);
  }

  @Put(':id')
  update(
    @Body() payload: CreateMessageDto,
    @Param('id', ParseIntPipe) id: number,
    @User() userReq: PayloadAuth,
  ) {
    return this.messageService.update(payload, id, userReq);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number, @User() userReq: PayloadAuth) {
    return this.messageService.delete(id, userReq);
  }
}
