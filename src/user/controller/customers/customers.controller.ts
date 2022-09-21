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
import { User } from '../../../auth/decorators/user.decorator';
import { PayloadAuth } from '../../../auth/models/token.model';
import { CreateCustomerDto, UpdateCustomerDto } from '../../dtos/customers.dto';
import { CustomersService } from '../../services/customers/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  findCostumer(@User() userReq: PayloadAuth) {
    return this.customersService.findCustomer(userReq);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto, @User() userReq: PayloadAuth) {
    return this.customersService.create(payload, userReq);
  }

  @Put(':id')
  update(
    @Body() payload: UpdateCustomerDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.customersService.update(payload, id);
  }
}
