import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assurance } from './entities/assurance.entity';
import { CreateAssuranceDto } from './dto/create-assurance.dto';
import { plainToInstance } from 'class-transformer';
import { AssuranceResponseDto } from './dto/assurance-response.dto';
import { Car } from '../car/entities/car.entity';

interface UploadFiles {
  assurance?: Express.Multer.File[];
}

@Injectable()
export class AssurancesService {
  constructor(
    @InjectRepository(Assurance)
    private assuranceRepo: Repository<Assurance>,

    @InjectRepository(Car)
    private carRepo: Repository<Car>,
  ) {}

  async create(dto: CreateAssuranceDto, files?: UploadFiles) {
    const car = await this.carRepo.findOne({
      where: { id: dto.carId },
    });

    if (!car) throw new NotFoundException('Car not found');

    const assurance = this.assuranceRepo.create({
      // dateAssurance: new Date(dto.dateAssurance),
      // dateProchain: new Date(dto.dateProchain),
      frontPicture: files?.assurance?.[0]?.filename,
      backPicture: files?.assurance?.[1]?.filename,
      car,
    });

    const saved = await this.assuranceRepo.save(assurance);

    return plainToInstance(AssuranceResponseDto, saved, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const assurances = await this.assuranceRepo.find({
      relations: ['car'],
      order: { createdAt: 'DESC' },
    });

    return plainToInstance(AssuranceResponseDto, assurances, {
      excludeExtraneousValues: true,
    });
  }

  async findByCar(carId: number) {
    const assurances = await this.assuranceRepo.find({
      where: { car: { id: carId } },
    });

    return plainToInstance(AssuranceResponseDto, assurances, {
      excludeExtraneousValues: true,
    });
  }
}
