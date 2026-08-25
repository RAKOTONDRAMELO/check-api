import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWarningDto } from './dto/create-warning.dto';
import { UpdateWarningDto } from './dto/update-warning.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Warning } from './entities/warning.entity';

@Injectable()
export class WarningsService {
  constructor(
    @InjectRepository(Warning)
    private readonly WarningRepository: Repository<Warning>,
  ) {}
  async create(id: number, createWarningDto: CreateWarningDto) {
    // console.log('createWarningDto:', createWarningDto);
    const warning = this.WarningRepository.create({
      car: { id: id },
      ...createWarningDto,
    });
    await this.WarningRepository.save(warning);
    return { message: 'Warning created successfully' };
  }

  findAll() {
    const warnings = this.WarningRepository.find({
      relations: ['car', 'planning'],
    });
    return warnings;
  }

  findOne(id: number) {
    const warning = this.WarningRepository.find({
      where: { id },
      relations: ['car', 'planning'],
    });
    return warning;
  }

  async update(id: number, updateWarningDto: UpdateWarningDto) {
    const warning = await this.WarningRepository.findOne({
      where: { id },
      relations: ['car', 'planning'],
    });
    if (!warning) {
      throw new NotFoundException('Warning not found');
    }
    Object.assign(warning, { planning: { id: updateWarningDto.planningId } });
    // console.log('warning:', warning);
    await this.WarningRepository.save(warning);
    return `This action updates a #${id} warning`;
  }

  async remove(id: number) {
    const result = await this.WarningRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Warning not found');
    }

    return { message: 'Deleted successfully' };
  }
}
