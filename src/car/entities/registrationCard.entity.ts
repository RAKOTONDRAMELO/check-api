import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { Car } from './car.entity';

// import { UserRole, UserRoleInfo, UserStatus, UserStatusInfo } from '../enum';

@Entity('registration_cards')
export class RegistrationCard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true, name: 'front_picture' })
  frontPicture?: string;

  @Column({ nullable: true, name: 'back_picture' })
  backPicture?: string;

  @OneToOne(() => Car, (car) => car.registrationCard)
  car!: Car;
  /**
   * Date de création
   */
  @CreateDateColumn()
  createdAt?: Date;
}
