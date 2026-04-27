import { IsInt, IsOptional, IsString, Min, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCarDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  place!: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  km!: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  immatriculation?: string;

  @Type(() => Number)
  @IsInt()
  anneeDeSortie!: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  numChassis?: string;
}
