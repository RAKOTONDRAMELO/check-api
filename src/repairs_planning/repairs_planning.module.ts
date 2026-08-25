import { Module } from '@nestjs/common';
import { RepairsPlanningService } from './repairs_planning.service';
import { RepairsPlanningController } from './repairs_planning.controller';
import { RepairsPlanning } from './entities/repairs_planning.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // Planning,
      RepairsPlanning,
      // RepairsAction,
    ]),
  ],
  controllers: [RepairsPlanningController],
  providers: [RepairsPlanningService],
  exports: [TypeOrmModule],
})
export class RepairsPlanningModule {}
