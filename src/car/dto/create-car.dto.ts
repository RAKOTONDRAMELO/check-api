import { IsInt, IsOptional, IsString, Min, MaxLength } from 'class-validator';

export class CreateCarDto {
  @IsString()
  type?: string;

  // nombre de places
  @IsInt()
  seats!: number;

  // kilométrage
  @IsInt()
  odometer!: number;

  // immatriculation
  @IsOptional()
  @IsString()
  @MaxLength(50)
  registrationNumber?: string;

  // année de sortie
  @IsString()
  releaseDate!: string;

  // numéro de chassis
  @IsOptional()
  @IsString()
  @MaxLength(100)
  chassisNumber?: string;

  // puissance fiscale
  @IsOptional()
  @IsInt()
  @Min(0)
  fiscalPower?: number;

  // type de boîte de vitesse
  @IsOptional()
  @IsString()
  @MaxLength(100)
  transmissionType?: string;

  // nombre de portes
  @IsOptional()
  @IsInt()
  @Min(0)
  numberOfDoors?: number;

  // couleur
  @IsOptional()
  @IsString()
  @MaxLength(50)
  color?: string;

  // marque
  @IsOptional()
  @IsString()
  @MaxLength(100)
  brand?: string;

  // modèle
  @IsOptional()
  @IsString()
  @MaxLength(100)
  model?: string;

  // type de carrosserie
  @IsOptional()
  @IsString()
  @MaxLength(100)
  bodyType?: string;

  // type de motorisation
  @IsOptional()
  @IsString()
  @MaxLength(100)
  engineType?: string;

  // capacité du coffre
  @IsOptional()
  @IsInt()
  @Min(0)
  trunkCapacity?: number;

  // consommation moyenne
  @IsOptional()
  @IsInt()
  @Min(0)
  averageConsumption?: number;

  // type d'achat
  @IsOptional()
  @IsString()
  @MaxLength(100)
  purchaseType?: string;

  // prix d'achat
  @IsOptional()
  @IsInt()
  @Min(0)
  purchasePrice?: number;

  // disponibilité
  @IsOptional()
  @IsString()
  @MaxLength(100)
  availabilityStatus?: string;

  // photo de la voiture
  @IsOptional()
  @IsString()
  photoCarPath?: string;
  // date d'assurance
  @IsString()
  assuranceDate?: string;

  //date de contrôle technique
  @IsString()
  technicalControlDate?: string;
}
