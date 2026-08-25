import { Test, TestingModule } from '@nestjs/testing';
import { RepairsPlanningService } from './repairs_planning.service';

describe('RepairsPlanningService', () => {
  let service: RepairsPlanningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepairsPlanningService],
    }).compile();

    service = module.get<RepairsPlanningService>(RepairsPlanningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
