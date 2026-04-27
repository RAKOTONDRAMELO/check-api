import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  // PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';

// import { UserRole, UserRoleInfo, UserStatus, UserStatusInfo } from '../enum';

@Entity('cv')
export class CV {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'file_path' })
  filePath!: string;

  @ManyToOne(() => User, (user) => user.cv, {
    onDelete: 'CASCADE', // optionnel
  })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  /**
   * Date de création
   */
  @CreateDateColumn()
  createdAt?: Date;
}
