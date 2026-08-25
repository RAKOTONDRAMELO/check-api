import { Car } from '../../car/entities/car.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('assurances')
export class Assurance {
  @PrimaryGeneratedColumn()
  id!: number;

  // @Column()
  // durabilty?: string;

  // @Column()
  // price?: number;

  // @Column({ nullable: true })
  // agence?: string;

  @Column({ nullable: true, name: 'front_picture' })
  frontPicture?: string;

  @Column({ nullable: true, name: 'back_picture' })
  backPicture?: string;

  // @Column({ nullable: true, name: 'durability' })
  // durability?: number; // nombre de mois

  // @Column({ nullable: true, name: 'release_date' })
  // releaseDate?: Date; // date de paiement

  // @Column({ nullable: true, name: 'begin_date' })
  // beginDate?: Date; // date de debut de validite

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Chaque assurance appartient à une voiture
  @ManyToOne(() => Car, (car) => car.assurances)
  car!: Car;
}
