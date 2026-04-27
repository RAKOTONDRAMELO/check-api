import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CV } from './entities/cv.entity';
import { CIN } from './entities/cin.entity';
import { DrivingLicense } from './entities/driving_license.entity';
import { DrivingCat } from './entities/driving_cat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, CV, CIN, DrivingLicense, DrivingCat]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
