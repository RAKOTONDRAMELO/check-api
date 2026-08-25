import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { unlink } from 'fs/promises';
import { join } from 'path';

import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './entities/car.entity';
import { CarResponseDto } from './dto/car-response.dto';
import { plainToInstance } from 'class-transformer';
import { Nif } from './entities/nif.entity';
import { Stat } from './entities/stat.entity';
import { RegistrationCard } from './entities/registrationCard.entity';

interface UploadFiles {
  photo_stat?: Express.Multer.File[];
  photo_nif?: Express.Multer.File[];
  photo_registration_card?: Express.Multer.File[];
}

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,

    @InjectRepository(Nif)
    private readonly nifRepo: Repository<Nif>,

    @InjectRepository(Stat)
    private readonly statRepo: Repository<Stat>,

    @InjectRepository(RegistrationCard)
    private readonly registrationCardRepo: Repository<RegistrationCard>,
  ) {}

  private getFilename(file?: Express.Multer.File[]): string | undefined {
    return file?.[0]?.filename;
  }

  async create(dto: CreateCarDto, files?: UploadFiles): Promise<Car> {
    const car = this.carRepository.create({
      ...dto,
    });
    await this.carRepository.save(car);

    // créer les entités associées
    if (files?.photo_nif) {
      const nif = this.nifRepo.create({
        frontPicture: files?.photo_nif?.[0]?.filename,
        backPicture: files?.photo_nif?.[1]?.filename,
        car: car,
      });
      await this.nifRepo.save(nif);
    }

    if (files?.photo_stat) {
      const stat = this.statRepo.create({
        frontPicture: files?.photo_stat?.[0]?.filename,
        backPicture: files?.photo_stat?.[1]?.filename,
      });
      await this.statRepo.save(stat);
    }

    if (files?.photo_registration_card) {
      const registrationCard = this.registrationCardRepo.create({
        frontPicture: files?.photo_registration_card?.[0]?.filename,
        backPicture: files?.photo_registration_card?.[1]?.filename,
        car: car,
      });
      await this.registrationCardRepo.save(registrationCard);
    }
    return car;
  }

  async findAll(): Promise<Car[]> {
    const cars = await this.carRepository.find({
      order: { createdAt: 'DESC' },
      relations: ['warning'],
    });
    // if (!cars) throw new NotFoundException('Car not found');
    return cars;
    // Transformer automatiquement en DTO de sortie
    // return plainToInstance(Car, cars, {
    //   excludeExtraneousValues: true,
    // });
  }
  async findOne(id: number): Promise<Car> {
    const car = await this.carRepository.findOne({
      where: { id },
      relations: ['warning'],
    });
    if (!car) throw new NotFoundException('Car not found');
    return car;
  }

  private async deleteFile(filePath?: string) {
    if (!filePath) return;
    try {
      await unlink(join('./uploads/cars', filePath));
    } catch {
      // fichier peut ne pas exister, ignorer l'erreur
      console.warn(`Impossible de supprimer le fichier: ${filePath}`);
    }
  }

  // async update(
  //   id: number,
  //   dto: UpdateCarDto,
  //   files?: UploadFiles,
  // ): Promise<Car> {
  //   const car = await this.findOne(id);

  //   Object.assign(car, dto);

  //   // recto
  //   if (files?.carteGrise?.[0]) {
  //     await this.deleteFile(car.carteGriseRectoPath);
  //     car.carteGriseRectoPath = files.carteGrise[0].filename;
  //   }

  //   // verso
  //   if (files?.carteGrise?.[1]) {
  //     await this.deleteFile(car.carteGriseVersoPath);
  //     car.carteGriseVersoPath = files.carteGrise[1].filename;
  //   }

  //   return this.carRepository.save(car);
  // }

  // async remove(id: number): Promise<void> {
  //   const car = await this.findOne(id);

  //   // supprimer les fichiers associés
  //   await this.deleteFile(car.carteGriseRectoPath);
  //   await this.deleteFile(car.carteGriseVersoPath);

  //   await this.carRepository.remove(car);
  // }
}
