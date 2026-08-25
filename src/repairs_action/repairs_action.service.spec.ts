import { Test, TestingModule } from '@nestjs/testing';
import { RepairsActionService } from './repairs_action.service';

describe('RepairsActionService', () => {
  let service: RepairsActionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepairsActionService],
    }).compile();

    service = module.get<RepairsActionService>(RepairsActionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
