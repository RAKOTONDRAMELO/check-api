import { IsNotEmpty, IsString } from 'class-validator';
export class CreatePlanningDto {
  @IsString()
  @IsNotEmpty()
  num!: string;

  @IsString()
  description?: string;
}
