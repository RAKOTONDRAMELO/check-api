import { PartialType } from '@nestjs/mapped-types';
import { CreateRepairsActionDto } from './create-repairs_action.dto';
import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';

export class UpdateRepairsActionDto extends PartialType(
  CreateRepairsActionDto,
) {
  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsNumber()
  @IsNotEmpty()
  price?: number;

  @IsString()
  @IsNotEmpty()
  place?: string;

  @IsString()
  @IsNotEmpty()
  technician?: string;

  @IsDate()
  @IsNotEmpty()
  dateOfAction?: Date;
}
