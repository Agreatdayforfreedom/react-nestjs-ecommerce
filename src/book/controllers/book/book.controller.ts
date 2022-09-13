import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipe,
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
import { BookService } from '../../services/book/book.service';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { Role } from '../../../auth/models/role.model';
import { FileSizeValidationPipe } from '../../pipes/FileSizeValidationPipe.pipe';

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
  create(@Body() payload: CreateBookDto, @Request() req: any) {
    return this.bookService.create(payload, req);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  update(
    @Request() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBookDto,
  ) {
    return this.bookService.update(id, payload, req);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  delete(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.bookService.delete(id, req);
  }
}
