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
import { Warning } from '../../warnings/entities/warning.entity';
import { RepairsPlanning } from '../../repairs_planning/entities/repairs_planning.entity';

// import { UserRole, UserRoleInfo, UserStatus, UserStatusInfo } from '../enum';

@Entity('planning')
export class Planning {
  @PrimaryGeneratedColumn()
  id!: number;

  //numero de planning
  @Column({ name: 'num' })
  num!: string;

  @OneToMany(() => Warning, (warning) => warning.planning)
  warning!: Warning[];

  @Column({ name: 'description', nullable: true, length: 255 })
  description?: string;

  @Column({ name: 'repairsPlanning_id', nullable: true })
  @OneToOne(
    () => RepairsPlanning,
    (repairsPlanning) => repairsPlanning.planning,
  )
  @JoinColumn({ name: 'repairsPlanning_id' })
  repairsPlanning!: RepairsPlanning;

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
