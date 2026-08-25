import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
// import { Warning } from './warning.entity';
import { RepairsAction } from '../../repairs_action/entities/repairs_action.entity';
import { Planning } from '../../planning/entities/planning.entity';

// import { UserRole, UserRoleInfo, UserStatus, UserStatusInfo } from '../enum';

@Entity('repairs_planning')
export class RepairsPlanning {
  @PrimaryGeneratedColumn()
  id!: number;

  //numero de planning
  @Column({ name: 'num' })
  num!: string;

  @Column({ name: 'label' })
  label!: string;

  @Column({ name: 'labor_cost' })
  laborCost!: number;

  @Column({ name: 'odometer' })
  odometer!: number;

  @Column({ name: 'description', nullable: true, length: 255 })
  description?: string;

  @OneToOne(() => Planning, (planning) => planning.repairsPlanning)
  @JoinColumn({ name: 'planning_id' })
  planning!: Planning;

  @OneToMany(
    () => RepairsAction,
    (repairsAction) => repairsAction.repairPlanning,
  )
  @JoinColumn()
  repairsAction?: RepairsAction[];

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
