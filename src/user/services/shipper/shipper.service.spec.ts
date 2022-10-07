import { Test, TestingModule } from '@nestjs/testing';
import { ShipperService } from './shipper.service';

describe('ShipperService', () => {
  let service: ShipperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShipperService],
    }).compile();

    service = module.get<ShipperService>(ShipperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
