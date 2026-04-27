import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import { DrivingLicense } from './driving_license.entity';

// import { UserRole, UserRoleInfo, UserStatus, UserStatusInfo } from '../enum';

@Entity('driving_categories')
export class DrivingCat {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'label' })
  label!: string;

  @Column({ nullable: true, name: 'description' })
  description?: string;

  @Column({ nullable: true, name: 'weight' })
  weight?: string;

  @Column({ nullable: true, name: 'number_of_places' })
  numberOfPlaces?: string;

  @ManyToMany(() => DrivingLicense, (drivingLicense) => drivingLicense.category)
  drivingLicense?: DrivingLicense;
  /**
   * Date de création
   */
  @CreateDateColumn()
  createdAt?: Date;
}
