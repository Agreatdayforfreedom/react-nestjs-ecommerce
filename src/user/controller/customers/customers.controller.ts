import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { CustomersService } from '../../services/customers/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  findCostumer(@Request() req: any) {
    return this.customersService.findCustomer(req);
  }

  @Post()
  create(@Body() payload: any, @Request() req: any) {
    return this.customersService.create(payload, req);
  }
}
