import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from '../../dtos/customers.dto';
import { CustomersService } from '../../services/customers/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  findCostumer(@Request() req: any) {
    return this.customersService.findCustomer(req);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto, @Request() req: any) {
    return this.customersService.create(payload, req);
  }

  @Put(':id')
  update(
    @Body() payload: UpdateCustomerDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.customersService.update(payload, id);
  }
}
