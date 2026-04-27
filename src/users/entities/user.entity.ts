import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  // PrimaryColumn,
} from 'typeorm';
import { UserRole, UserStatus } from '../enum';
import { CV } from './cv.entity';
import { CIN } from './cin.entity';
import { DrivingLicense } from './driving_license.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'name' })
  name!: string;

  @Column({ nullable: true, name: 'first_name' })
  firstName?: string;

  @Column({ name: 'birthday' })
  birthday!: Date;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  contact?: string;

  @Column({ nullable: true })
  adress!: string;

  @Column()
  password!: string;

  @Column({ nullable: true, default: true })
  acces!: boolean;

  @Column({ nullable: true, name: 'profil_path' })
  profilPath?: string;

  @Column({ nullable: true })
  speciality?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role!: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status?: UserStatus;

  @OneToMany(() => CV, (cv) => cv.user)
  cv?: CV[];

  @OneToOne(() => CIN, (cin) => cin.user, { cascade: true })
  @JoinColumn()
  cin!: CIN;

  @OneToOne(() => DrivingLicense, (drivingLicense) => drivingLicense.user, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  drivingLicense?: DrivingLicense;
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
