import { PartialType } from '@nestjs/mapped-types';
import { CreateWarningDto } from './create-warning.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateWarningDto extends PartialType(CreateWarningDto) {
  @IsString()
  @IsNotEmpty()
  planningId!: number;
}
