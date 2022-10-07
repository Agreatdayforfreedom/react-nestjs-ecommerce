import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shipper } from '../../entities/shipper.entity';
import { Repository } from 'typeorm';
import { PayloadAuth } from '../../../auth/models/token.model';
import { OrderService } from '../order/order.service';

@Injectable()
export class ShipperService {
  constructor(
    @InjectRepository(Shipper) private shipperRepo: Repository<Shipper>,
  ) {}

  async getShippers(): Promise<Shipper[]> {
    return this.shipperRepo.find();
  }
}
