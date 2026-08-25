import { DrivingLicense } from 'src/users/entities/driving_license.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { DrivingCat } from 'src/users/entities/driving_cat.entity';
import { CIN } from 'src/users/entities/cin.entity';
import { CV } from 'src/users/entities/cv.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'check_db',
  entities: [User, DrivingLicense, CIN, DrivingCat, CV],
  migrations: ['src/migration/*.ts'],
  synchronize: false,
});
