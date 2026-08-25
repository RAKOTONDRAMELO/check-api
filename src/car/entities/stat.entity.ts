import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  // PrimaryColumn,
} from 'typeorm';
import { Nif } from './nif.entity';

// import { UserRole, UserRoleInfo, UserStatus, UserStatusInfo } from '../enum';

@Entity('stats')
export class Stat {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true, name: 'registration_number' })
  registrationNumber?: number;

  @Column({ nullable: true, name: 'front_picture' })
  frontPicture?: string;

  @Column({ nullable: true, name: 'back_picture' })
  backPicture?: string;

  @OneToMany(() => Nif, (nif) => nif.stat, {
    cascade: true,
    eager: true,
  })
  nif?: Nif[];

  /**
   * Date de création
   */
  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
