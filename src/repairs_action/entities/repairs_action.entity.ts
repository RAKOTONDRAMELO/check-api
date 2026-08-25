import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
// import { Warning } from './warning.entity';
import { RepairsPlanning } from '../../repairs_planning/entities/repairs_planning.entity';
import { Car } from 'src/car/entities/car.entity';

// import { UserRole, UserRoleInfo, UserStatus, UserStatusInfo } from '../enum';

@Entity('repairs_actions')
export class RepairsAction {
  @PrimaryGeneratedColumn()
  id!: number;

  //numero de planning
  @Column({ name: 'name_of_piece' })
  nameOfPiece!: string;

  //changement neuf ou reparition
  @Column({ name: 'type' })
  type!: string;

  // @Column({ name: 'quantity' })
  // quantity!: number;

  @Column({ name: 'price' })
  price?: number;

  @Column({ name: 'place' })
  place?: string;

  @Column({ name: 'technician' })
  technician?: string;

  @Column({ name: 'validation', default: false })
  validation!: boolean;

  @Column({ name: 'action_done', default: false })
  actionDone!: boolean;

  @Column({ name: 'date_of_action' })
  dateOfAction?: Date;

  @ManyToOne(() => RepairsPlanning, (planning) => planning.repairsAction)
  @JoinColumn({ name: 'repair_planning_id' })
  repairPlanning!: RepairsPlanning;

  @ManyToOne(() => Car, (car) => car.repairsAction)
  @JoinColumn({ name: 'car_id' })
  car!: Car;

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
}
