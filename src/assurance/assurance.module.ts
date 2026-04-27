import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assurance } from './entities/assurance.entity';
import { Car } from '../car/entities/car.entity';
import { AssurancesController } from './assurance.controller';
import { AssurancesService } from './assurance.service';

@Module({
  imports: [TypeOrmModule.forFeature([Assurance, Car])],
  controllers: [AssurancesController],
  providers: [AssurancesService],
})
export class AssurancesModule {}
