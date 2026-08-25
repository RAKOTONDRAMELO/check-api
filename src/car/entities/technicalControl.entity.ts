import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  // PrimaryColumn,
} from 'typeorm';
import { Car } from './car.entity';

// import { UserRole, UserRoleInfo, UserStatus, UserStatusInfo } from '../enum';

@Entity('technicalControls')
export class TechnicalControl {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true, name: 'front_picture' })
  frontPicture?: string;

  @Column({ nullable: true, name: 'back_picture' })
  backPicture?: string;

  //   @Column({ nullable: true, name: 'durability' })
  //   durability?: number; // nombre de mois

  //   @Column({ nullable: true, name: 'price' })
  //   price?: number; // chiffre en ariary

  //   @Column({ nullable: true, name: 'release_date' })
  //   releaseDate?: Date; // date de paiement

  //   @Column({ nullable: true, name: 'begin_date' })
  //   beginDate?: Date; // date de debut de validite

  @OneToOne(() => Car, (car) => car.technicalControl)
  car!: Car;

  /**
   * Date de création
   */
  @CreateDateColumn()
  createdAt?: Date;
}
