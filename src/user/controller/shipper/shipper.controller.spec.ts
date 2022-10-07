import { Test, TestingModule } from '@nestjs/testing';
import { ShipperController } from './shipper.controller';

describe('ShipperController', () => {
  let controller: ShipperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShipperController],
    }).compile();

    controller = module.get<ShipperController>(ShipperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
