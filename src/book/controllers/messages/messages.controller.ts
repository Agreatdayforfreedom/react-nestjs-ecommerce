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
  Request,
} from '@nestjs/common';
import { MessagesService } from '../../services/messages/messages.service';
import { CreateMessageDto } from '../../dtos/message.dto';
import { Public } from '../../../auth/decorators/public.decorator';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Public()
  @Get(':id')
  findAll(@Param('id', ParseIntPipe) id: number, @Query() query?: any) {
    return this.messageService.findAll(id, query);
  }

  @Post(':id')
  create(
    @Body() payload: CreateMessageDto,
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    return this.messageService.create(payload, id, req);
  }

  @Put(':id')
  update(
    @Body() payload: CreateMessageDto,
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    return this.messageService.update(payload, id, req);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.messageService.delete(id, req);
  }
}
