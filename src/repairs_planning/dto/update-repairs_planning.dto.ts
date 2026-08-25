import { PartialType } from '@nestjs/mapped-types';
import { CreateRepairsPlanningDto } from './create-repairs_planning.dto';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateRepairsPlanningDto extends PartialType(
  CreateRepairsPlanningDto,
) {
  @IsString()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  odometer!: number;

  @IsString()
  label?: string;

  @IsNumber()
  @IsNotEmpty()
  laborCost!: number;
}
