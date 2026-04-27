import { Type } from 'class-transformer';
import { IsDateString, IsNumber } from 'class-validator';

export class CreateAssuranceDto {
  @IsDateString()
  dateAssurance!: string;

  @IsDateString()
  dateProchain!: string;

  @Type(() => Number)
  @IsNumber()
  carId!: number;
}
