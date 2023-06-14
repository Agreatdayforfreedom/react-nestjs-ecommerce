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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Public } from '../../../auth/decorators/public.decorator';
import { CreateBookDto, UpdateBookDto } from '../../dtos/book.dto';
import { BookService, Query as IQuery } from '../../services/book/book.service';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { Role } from '../../../auth/models/role.model';
import { FileSizeValidationPipe } from '../../pipes/FileSizeValidationPipe.pipe';
import { User } from '../../../auth/decorators/user.decorator';
import { PayloadAuth } from '../../../auth/models/token.model';

@UseGuards(RolesGuard)
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Public()
  @Get()
  findAllFilter(@Query() query: IQuery) {
    // console.log(query);
    console.log('here');
    return this.bookService.findAllFilter(query);
  }
  @Public()
  @Get('category')
  findByCategory(@Query() query: IQuery) {
    return this.bookService.findByCategory(query);
  }

  @Public()
  @Get('bestsellers')
  findBestSellers(@Query() query: { take: number }) {
    return this.bookService.findBestSellers(query);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile('file', FileSizeValidationPipe) file: Express.Multer.File,
  ) {
    return this.bookService.upload(id, file);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateBookDto, @User() userReq: PayloadAuth) {
    return this.bookService.create(payload, userReq);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  update(
    @User() userReq: PayloadAuth,
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBookDto,
  ) {
    return this.bookService.update(id, payload, userReq);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  delete(@User() userReq: PayloadAuth, @Param('id', ParseIntPipe) id: number) {
    return this.bookService.delete(id, userReq);
  }
}
