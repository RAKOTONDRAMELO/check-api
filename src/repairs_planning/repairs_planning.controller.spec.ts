import { Test, TestingModule } from '@nestjs/testing';
import { RepairsPlanningController } from './repairs_planning.controller';
import { RepairsPlanningService } from './repairs_planning.service';

describe('RepairsPlanningController', () => {
  let controller: RepairsPlanningController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepairsPlanningController],
      providers: [RepairsPlanningService],
    }).compile();

    controller = module.get<RepairsPlanningController>(RepairsPlanningController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
