import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanningDto } from './create-planning.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePlanningDto extends PartialType(CreatePlanningDto) {
  @IsString()
  @IsNotEmpty()
  repairsPlanningId!: number;
}
