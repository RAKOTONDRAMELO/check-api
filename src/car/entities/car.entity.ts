import { Assurance } from '../../assurance/entities/assurance.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  id!: number;

  // nombre de places
  @Column()
  place!: number;

  // kilométrage
  @Column()
  km!: number;

  // immatriculation
  @Column({ nullable: true, length: 50 })
  immatriculation?: string;

  // année de sortie
  @Column()
  anneeDeSortie!: number;

  // numéro de chassis
  @Column({ nullable: true, length: 100 })
  numChassis?: string;

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

  @Column({ nullable: true })
  carteGriseRectoPath?: string;

  @Column({ nullable: true })
  carteGriseVersoPath?: string;

  @OneToMany(() => Assurance, (assurance) => assurance.car, {
    cascade: true,
    eager: true, // charge automatiquement les assurances avec la voiture
  })
  assurances?: Assurance[];
}
