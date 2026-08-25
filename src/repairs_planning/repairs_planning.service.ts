import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRepairsPlanningDto } from './dto/create-repairs_planning.dto';
import { UpdateRepairsPlanningDto } from './dto/update-repairs_planning.dto';
import { RepairsPlanning } from './entities/repairs_planning.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RepairsPlanningService {
  constructor(
    @InjectRepository(RepairsPlanning)
    private readonly RepairsPlanningRepository: Repository<RepairsPlanning>,

    // @InjectRepository(Warning)
    // private readonly warningRepo: Repository<Warning>,
  ) {}
  async create(createRepairsPlanningDto: CreateRepairsPlanningDto) {
    // console.log('createRepairsPlanningDto:', createRepairsPlanningDto);
    const repairsPlanning = this.RepairsPlanningRepository.create({
      planning: { id: createRepairsPlanningDto.planningId },
      ...createRepairsPlanningDto,
    });
    await this.RepairsPlanningRepository.save(repairsPlanning);
    return repairsPlanning.id;
  }

  findAll() {
    const repairsPlannings = this.RepairsPlanningRepository.find({
      relations: ['planning', 'repairsAction', 'planning.warning'],
    });
    return repairsPlannings;
  }

  findOne(id: number) {
    const repairsPlanning = this.RepairsPlanningRepository.find({
      where: { id },
      relations: ['planning', 'repairsAction', 'planning.warning'],
    });
    return repairsPlanning;
  }

  async update(id: number, updateRepairsPlanningDto: UpdateRepairsPlanningDto) {
    const repairsPlanning = await this.RepairsPlanningRepository.findOne({
      where: { id },
      relations: ['planning', 'repairsAction', 'planning.warning'],
    });
    if (!repairsPlanning) {
      throw new NotFoundException('Repairs planning not found');
    }
    Object.assign(repairsPlanning, updateRepairsPlanningDto);
    await this.RepairsPlanningRepository.save(repairsPlanning);
    return `This action updates a #${id} repairsPlanning`;
  }

  async remove(id: number) {
    const result = await this.RepairsPlanningRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Repairs planning not found');
    }

    return { message: 'Deleted successfully' };
  }
}
