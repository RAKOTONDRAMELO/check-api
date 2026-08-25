import { Assurance } from '../../assurance/entities/assurance.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Nif } from './nif.entity';
import { RegistrationCard } from './registrationCard.entity';
import { TechnicalControl } from './technicalControl.entity';
import { Warning } from 'src/warnings/entities/warning.entity';
import { RepairsAction } from 'src/repairs_action/entities/repairs_action.entity';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  id!: number;

  // type ex: voiture, moto, camion, bus, etc.
  @Column({ nullable: true, length: 100 })
  type?: string;

  // nombre de places
  @Column()
  seats!: number;

  // kilométrage
  @Column()
  odometer!: number;

  // immatriculation
  @Column({ nullable: true, length: 50, name: 'registration_number' })
  registrationNumber?: string;

  // année de sortie
  @Column({ name: 'release_date' })
  releaseDate!: string;

  // numéro de chassis
  @Column({ nullable: true, length: 100, name: 'chassis_number' })
  chassisNumber?: string;

  // puissance fiscale
  @Column({ nullable: true, name: 'fiscal_power' })
  fiscalPower?: number;

  // type de boîte de vitesse
  @Column({ nullable: true, length: 100, name: 'transmission_type' })
  transmissionType?: string;

  // nombre de portes
  @Column({ nullable: true, name: 'number_of_doors' })
  numberOfDoors?: number;

  // couleur
  @Column({ nullable: true, length: 50 })
  color?: string;

  // marque
  @Column({ nullable: true, length: 100 })
  brand?: string;

  // modèle
  @Column({ nullable: true, length: 100 })
  model?: string;

  // type de carrosserie
  @Column({ nullable: true, length: 100, name: 'body_type' })
  bodyType?: string;

  // type de motorisation
  @Column({ nullable: true, length: 100, name: 'engine_type' })
  engineType?: string;

  // capacité du coffre
  @Column({ nullable: true, name: 'trunk_capacity' })
  trunkCapacity?: number;

  // consommation moyenne
  @Column({ nullable: true, name: 'average_consumption' })
  averageConsumption?: number;

  // type d'achat
  @Column({ nullable: true, name: 'purchase_type' })
  purchaseType?: string;

  // prix d'achat
  @Column({ nullable: true, name: 'purchase_price' })
  purchasePrice?: number;

  // disponibilité
  @Column({ nullable: true, name: 'availability_status' })
  availabilityStatus?: string;

  // date d'assurance
  @Column({ nullable: true, name: 'assurance_date' })
  assuranceDate?: string;

  //date de contrôle technique
  @Column({ nullable: true, name: 'technical_control_date' })
  technicalControlDate?: string;

  // photo de la voiture
  @Column({ nullable: true, name: 'photo_car_path' })
  photoCarPath?: string;

  /**
   * Date de création
   */
  @CreateDateColumn()
  createdAt!: Date;

  /**
   * Date de modification
   */
  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Assurance, (assurance) => assurance.car, {
    cascade: true,
    eager: true, // charge automatiquement les assurances avec la voiture
  })
  assurances?: Assurance[];

  @OneToOne(() => Nif, (nif) => nif.car, { cascade: true })
  @JoinColumn()
  nif!: Nif;

  @OneToOne(
    () => TechnicalControl,
    (technicalControl) => technicalControl.car,
    { cascade: true },
  )
  @JoinColumn()
  technicalControl!: TechnicalControl;

  @OneToMany(() => Warning, (warning) => warning.car, {
    nullable: true,
    cascade: true,
  })
  // @JoinColumn({ name: 'car_id' })
  warning?: Warning[];

  @OneToMany(() => RepairsAction, (repairsAction) => repairsAction.car, {
    nullable: true,
    cascade: true,
  })
  // @JoinColumn({ name: 'car_id' })
  repairsAction?: RepairsAction[];

  @OneToOne(
    () => RegistrationCard,
    (registrationCard) => registrationCard.car,
    { cascade: true },
  )
  @JoinColumn()
  registrationCard?: RegistrationCard;
}
