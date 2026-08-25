import { Exclude, Expose, Transform } from 'class-transformer';
// import { Car } from '../entities/car.entity'; 

@Exclude() // Exclut tout par défaut
export class CarResponseDto {
  @Expose()
  id!: number;

  @Expose()
  type!: string;

  @Expose()
  seats?: number;

  @Expose()
  odometer?: number;

  @Expose()
  registrationNumber?: string;

  @Expose()
  releaseDate?: Date;

  @Expose()
  chassisNumber?: string;
  @Expose()
  transmissionType?: string;
  @Expose()
  numberOfDoors?: number;
  @Expose()
  color?: string;
  @Expose()
  brand?: string;
  @Expose()
  model?: string;
  @Expose()
  bodyType?: string;
  @Expose()
  engineType?: string;
  @Expose()
  trunkCapacity?: number;
  @Expose()
  averageConsumption?: number;
  @Expose()
  purchaseType?: string;
  @Expose()
  purchasePrice?: number;
  @Expose()
  availabilityStatus?: string;

  // @Transform(({ obj }: { obj: Car }) =>
  //   obj.carteGriseRectoPath
  //     ? `${process.env.APP_URL || 'http://localhost:8000'}/uploads/cars/${obj.carteGriseRectoPath}`
  //     : null,
  // )
  // carteGriseRectoUrl!: string | null;

  // @Expose()
  // @Transform(({ obj }: { obj: Car }) =>
  //   obj.carteGriseVersoPath
  //     ? `${process.env.APP_URL || 'http://localhost:8000'}/uploads/cars/${obj.carteGriseVersoPath}`
  //     : null,
  // )
  // carteGriseVersoUrl!: string | null;

  // Champs internes qu’on n’expose pas
  // carteGriseRectoPath?: string;
  // carteGriseVersoPath?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
