import { Exclude, Expose, Transform } from 'class-transformer';
import { Car } from '../entities/car.entity';

@Exclude() // Exclut tout par défaut
export class CarResponseDto {
  @Expose()
  id!: number;

  @Expose()
  place!: number;

  @Expose()
  km!: number;

  @Expose()
  immatriculation?: string;

  @Expose()
  anneeDeSortie!: number;

  @Expose()
  numChassis?: string;

  @Expose()
  @Transform(({ obj }: { obj: Car }) =>
    obj.carteGriseRectoPath
      ? `${process.env.APP_URL || 'http://localhost:8000'}/uploads/cars/${obj.carteGriseRectoPath}`
      : null,
  )
  carteGriseRectoUrl!: string | null;

  @Expose()
  @Transform(({ obj }: { obj: Car }) =>
    obj.carteGriseVersoPath
      ? `${process.env.APP_URL || 'http://localhost:8000'}/uploads/cars/${obj.carteGriseVersoPath}`
      : null,
  )
  carteGriseVersoUrl!: string | null;

  // Champs internes qu’on n’expose pas
  carteGriseRectoPath?: string;
  carteGriseVersoPath?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
