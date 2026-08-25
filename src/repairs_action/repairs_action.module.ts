import { Module } from '@nestjs/common';
import { RepairsActionService } from './repairs_action.service';
import { RepairsActionController } from './repairs_action.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepairsAction } from './entities/repairs_action.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // Warning,
      // Planning,
      // RepairsPlanning,
      RepairsAction,
    ]),
  ],
  controllers: [RepairsActionController],
  providers: [RepairsActionService],
  exports: [TypeOrmModule],
})
export class RepairsActionModule {}
