import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  // PrimaryColumn,
} from 'typeorm';
import { Car } from './car.entity';
import { Stat } from './stat.entity';

// import { UserRole, UserRoleInfo, UserStatus, UserStatusInfo } from '../enum';

@Entity('nifs')
export class Nif {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true, name: 'registration_number' })
  registrationNumber?: number;

  @Column({ nullable: true, name: 'front_picture' })
  frontPicture?: string;

  @Column({ nullable: true, name: 'back_picture' })
  backPicture?: string;

  // @Column({ nullable: true, name: 'durability' })
  // durability?: number; // nombre de mois

  // @Column({ nullable: true, name: 'price' })
  // price?: number; // chiffre en ariary

  // @Column({ nullable: true, name: 'release_date' })
  // releaseDate?: Date; // date de paiement

  @OneToOne(() => Car, (car) => car.nif)
  car!: Car;

  @ManyToOne(() => Stat, (stat) => stat.nif, {
    onDelete: 'CASCADE', // optionnel
  })
  @JoinColumn({ name: 'stat_id' })
  stat!: Stat;

  /**
   * Date de création
   */
  @CreateDateColumn()
  createdAt?: Date;
}
