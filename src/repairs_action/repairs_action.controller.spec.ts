import { Test, TestingModule } from '@nestjs/testing';
import { RepairsActionController } from './repairs_action.controller';
import { RepairsActionService } from './repairs_action.service';

describe('RepairsActionController', () => {
  let controller: RepairsActionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepairsActionController],
      providers: [RepairsActionService],
    }).compile();

    controller = module.get<RepairsActionController>(RepairsActionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
