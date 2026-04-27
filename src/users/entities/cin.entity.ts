import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';

// import { UserRole, UserRoleInfo, UserStatus, UserStatusInfo } from '../enum';

@Entity('cin')
export class CIN {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'num' })
  num!: string;

  @Column({ nullable: true, name: 'front_picture' })
  frontPicture?: string;

  @Column({ nullable: true, name: 'back_picture' })
  backPicture?: string;

  @OneToOne(() => User, (user) => user.cin)
  user!: User;
  /**
   * Date de création
   */
  @CreateDateColumn()
  createdAt?: Date;
}
