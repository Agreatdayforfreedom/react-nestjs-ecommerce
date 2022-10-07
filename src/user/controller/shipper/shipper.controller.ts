import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { User } from '../../../auth/decorators/user.decorator';
import { PayloadAuth } from '../../../auth/models/token.model';
import { Public } from '../../../auth/decorators/public.decorator';
import { ShipperService } from '../../services/shipper/shipper.service';

@Controller('shipper')
export class ShipperController {
  constructor(private shipperService: ShipperService) {}

  @Public()
  @Get()
  getShippers() {
    return this.shipperService.getShippers();
  }
}
