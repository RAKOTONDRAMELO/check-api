import { Module } from '@nestjs/common';
import { WarningsService } from './warnings.service';
import { WarningsController } from './warnings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warning } from './entities/warning.entity';
// import { Planning } from './entities/planning.entity';
// import { RepairsAction } from './entities/repairs_action.entity';
// import { RepairsPlanning } from './entities/repairs_planning.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Warning,
      // Planning,
      // RepairsPlanning,
      // RepairsAction,
    ]),
  ],
  controllers: [WarningsController],
  providers: [WarningsService],
  exports: [TypeOrmModule],
})
export class WarningsModule {}
