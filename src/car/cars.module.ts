import { TypeOrmModule } from '@nestjs/typeorm';

import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { Car } from './entities/car.entity';
import { Module } from '@nestjs/common';
import { Assurance } from '../assurance/entities/assurance.entity';
import { Nif } from './entities/nif.entity';
import { Stat } from './entities/stat.entity';
import { RegistrationCard } from './entities/registrationCard.entity';
import { TechnicalControl } from './entities/technicalControl.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Car,
      Assurance,
      Nif,
      Stat,
      RegistrationCard,
      TechnicalControl,
    ]),
  ],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
