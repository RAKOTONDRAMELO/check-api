import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRepairsActionDto } from './dto/create-repairs_action.dto';
import { UpdateRepairsActionDto } from './dto/update-repairs_action.dto';
import { RepairsAction } from './entities/repairs_action.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RepairsActionService {
  constructor(
    @InjectRepository(RepairsAction)
    private readonly RepairsActionRepository: Repository<RepairsAction>,
  ) {}
  async create(createRepairsActionDto: CreateRepairsActionDto) {
    // console.log('createRepairsActionDto:', createRepairsActionDto);
    const repairsAction = this.RepairsActionRepository.create({
      car: { id: createRepairsActionDto.carId },
      repairPlanning: { id: createRepairsActionDto.planningId },
      ...createRepairsActionDto,
    });
    await this.RepairsActionRepository.save(repairsAction);
    return 'This action adds a new repairsAction';
  }
  findAll() {
    const repairsActions = this.RepairsActionRepository.find({
      relations: ['car', 'repairPlanning'],
    });
    return repairsActions;
  }
  findOne(id: number) {
    const repairsAction = this.RepairsActionRepository.find({
      where: { id },
      relations: ['car', 'repairPlanning'],
    });
    return repairsAction;
  }

  async update(id: number, updateRepairsActionDto: UpdateRepairsActionDto) {
    const repairsActions = await this.RepairsActionRepository.findOne({
      where: { id },
      relations: ['car', 'repairPlanning'],
    });
    if (!repairsActions) {
      throw new NotFoundException('Repairs action not found');
    }
    Object.assign(repairsActions, updateRepairsActionDto);
    await this.RepairsActionRepository.save(repairsActions);
    console.log('updateRepairsActionDto:', updateRepairsActionDto);
    return `This action updates a #${id} repairsAction`;
  }

  async remove(id: number) {
    const result = await this.RepairsActionRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('RepairsAction not found');
    }

    return { message: 'Deleted successfully' };
  }
}
