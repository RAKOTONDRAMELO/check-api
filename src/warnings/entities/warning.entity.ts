import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Planning } from '../../planning/entities/planning.entity';
import { Car } from 'src/car/entities/car.entity';

@Entity('warnings')
export class Warning {
  @PrimaryGeneratedColumn()
  id!: number;

  // description de l'avertissement
  @Column({ name: 'description' })
  description!: string;

  // type d'avertissement (ex: urgente, normale, etc...)
  @Column({ nullable: true, name: 'priority_level' })
  priorityLevel?: number;

  /**
   * Date de création
   */
  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  /**
   * Date de modification
   */
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @ManyToOne(() => Car, (car) => car.warning, {
    onDelete: 'CASCADE', // optionnel
  })
  @JoinColumn({ name: 'car_id' })
  car!: Car;

  @Column({ name: 'planning_id', nullable: true })
  @ManyToOne(() => Planning, (planning) => planning.warning, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'planning_id' })
  planning?: Planning;
}
