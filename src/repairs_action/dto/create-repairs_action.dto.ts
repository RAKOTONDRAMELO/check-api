import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateRepairsActionDto {
  @IsString()
  @IsNotEmpty()
  nameOfPiece!: string;

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

  @IsNumber()
  @IsNotEmpty()
  carId!: number;

  @IsNumber()
  @IsNotEmpty()
  planningId!: number;
}
