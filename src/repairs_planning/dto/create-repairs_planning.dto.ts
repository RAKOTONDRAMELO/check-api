import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateRepairsPlanningDto {
  @IsString()
  @IsNotEmpty()
  num!: string;

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

  @IsNumber()
  @IsNotEmpty()
  planningId!: number;
}
