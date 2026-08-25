import { Module } from '@nestjs/common';
import { PlanningService } from './planning.service';
import { PlanningController } from './planning.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planning } from './entities/planning.entity';
import { WarningsService } from '../warnings/warnings.service';
import { Warning } from 'src/warnings/entities/warning.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Warning,
      Planning,
      WarningsService,
      // RepairsPlanning,
      // RepairsAction,
    ]),
  ],
  controllers: [PlanningController],
  providers: [PlanningService, WarningsService],
  exports: [TypeOrmModule],
})
export class PlanningModule {}
