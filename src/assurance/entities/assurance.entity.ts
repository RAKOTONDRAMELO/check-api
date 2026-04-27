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

  @Column()
  dateAssurance!: Date;

  @Column()
  dateProchain!: Date;

  @Column({ nullable: true })
  assuranceRectoPath?: string;

  @Column({ nullable: true })
  assuranceVersoPath?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Chaque assurance appartient à une voiture
  @ManyToOne(() => Car, (car) => car.assurances)
  car!: Car;
}
