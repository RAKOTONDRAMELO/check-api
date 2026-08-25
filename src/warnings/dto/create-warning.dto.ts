import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateWarningDto {
  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @IsNotEmpty()
  priorityLevel!: number;

  @IsNumber()
  @IsNotEmpty()
  carId!: number;
}
