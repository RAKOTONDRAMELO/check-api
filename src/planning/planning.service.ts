import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanningDto } from './dto/create-planning.dto';
import { UpdatePlanningDto } from './dto/update-planning.dto';
import { Repository } from 'typeorm';
import { Planning } from './entities/planning.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { Warning } from 'src/warnings/entities/warning.entity';
// import { WarningsService } from '../warnings/warnings.service';

@Injectable()
export class PlanningService {
  constructor(
    @InjectRepository(Planning)
    private readonly PlanningRepository: Repository<Planning>,

    // @InjectRepository(Warning)
    // private readonly warningRepo: Repository<Warning>,
  ) {}
  async create(createPlanningDto: CreatePlanningDto) {
    // console.log('createPlanningDto:', createPlanningDto);
    const planning = this.PlanningRepository.create(createPlanningDto);
    await this.PlanningRepository.save(planning);
    return planning.id;
  }

  findAll() {
    const planning = this.PlanningRepository.find({
      relations: ['warning'],
    });
    return planning;
  }

  findOne(id: number) {
    const planning = this.PlanningRepository.find({
      where: { id },
      relations: ['warning'],
    });
    return planning;
  }

  async update(id: number, updatePlanningDto: UpdatePlanningDto) {
    const planning = await this.PlanningRepository.findOne({
      where: { id },
      relations: ['warning'],
    });
    if (!planning) {
      throw new NotFoundException('Planning not found');
    }
    Object.assign(planning, {
      repairsPlanning: { id: updatePlanningDto.repairsPlanningId },
    });
    await this.PlanningRepository.save(planning);
    return `This action updates a #${id} planning`;
  }

  async remove(id: number) {
    const result = await this.PlanningRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Planning not found');
    }

    return { message: 'Deleted successfully' };
  }
}
