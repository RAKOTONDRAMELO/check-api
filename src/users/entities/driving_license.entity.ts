import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToOne,
} from 'typeorm';
import { DrivingCat } from './driving_cat.entity';
import { User } from './user.entity';

// import { UserRole, UserRoleInfo, UserStatus, UserStatusInfo } from '../enum';

@Entity('driving_licenses')
export class DrivingLicense {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  num?: string;

  @Column({ nullable: true, name: 'front_picture' })
  frontPicture?: string;

  @Column({ nullable: true, name: 'back_picture' })
  backPicture?: string;

  @ManyToMany(() => DrivingCat, (drivingCat) => drivingCat.drivingLicense)
  category!: DrivingCat[];

  @OneToOne(() => User, (user) => user.cv)
  user!: User;
  /**
   * Date de création
   */
  @CreateDateColumn()
  createdAt?: Date;
}
