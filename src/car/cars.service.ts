import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { unlink } from 'fs/promises';
import { join } from 'path';

import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { CarResponseDto } from './dto/car-response.dto';
import { plainToInstance } from 'class-transformer';

interface UploadFiles {
  carteGrise?: Express.Multer.File[];
}

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  private getFilename(file?: Express.Multer.File[]): string | undefined {
    return file?.[0]?.filename;
  }

  async create(dto: CreateCarDto, files?: UploadFiles): Promise<Car> {
    const carData: DeepPartial<Car> = {
      ...dto,
      carteGriseRectoPath: files?.carteGrise?.[0]?.filename,
      carteGriseVersoPath: files?.carteGrise?.[1]?.filename,
    };

    const car = this.carRepository.create(carData);
    return this.carRepository.save(car);
  }

  async findAll(): Promise<CarResponseDto[]> {
    const cars = await this.carRepository.find({
      order: { createdAt: 'DESC' },
    });

    // Transformer automatiquement en DTO de sortie
    return plainToInstance(CarResponseDto, cars, {
      excludeExtraneousValues: true,
    });
  }
  async findOne(id: number): Promise<Car> {
    const car = await this.carRepository.findOne({ where: { id } });
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

  async update(
    id: number,
    dto: UpdateCarDto,
    files?: UploadFiles,
  ): Promise<Car> {
    const car = await this.findOne(id);

    Object.assign(car, dto);

    // recto
    if (files?.carteGrise?.[0]) {
      await this.deleteFile(car.carteGriseRectoPath);
      car.carteGriseRectoPath = files.carteGrise[0].filename;
    }

    // verso
    if (files?.carteGrise?.[1]) {
      await this.deleteFile(car.carteGriseVersoPath);
      car.carteGriseVersoPath = files.carteGrise[1].filename;
    }

    return this.carRepository.save(car);
  }

  async remove(id: number): Promise<void> {
    const car = await this.findOne(id);

    // supprimer les fichiers associés
    await this.deleteFile(car.carteGriseRectoPath);
    await this.deleteFile(car.carteGriseVersoPath);

    await this.carRepository.remove(car);
  }
}
