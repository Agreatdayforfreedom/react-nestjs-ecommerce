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
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Public } from '../../../auth/decorators/public.decorator';
import { CreateBookDto, UpdateBookDto } from '../../dtos/book.dto';
import { BookService } from '../../services/book/book.service';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { Role } from '../../../auth/models/role.model';

@UseGuards(RolesGuard)
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Public()
  @Get('books')
  findAll() {
    return this.bookService.findAll();
  }

  @Public()
  @Get()
  findAllFilter(@Query() query?: any) {
    return this.bookService.findAllFilter(query);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.findOne(id);
  }

  @Roles(Role.SELLER)
  @Post()
  create(@Body() payload: CreateBookDto, @Request() req: any) {
    return this.bookService.create(payload, req);
  }

  @Roles(Role.SELLER)
  @Put(':id')
  update(
    @Request() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBookDto,
  ) {
    return this.bookService.update(id, payload, req);
  }

  @Roles(Role.SELLER)
  @Delete(':id')
  delete(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.bookService.delete(id, req);
  }
}
