import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CarsModule } from './car/cars.module';
import { AssurancesModule } from './assurance/assurance.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (): TypeOrmModuleOptions => {
        const host: string = process.env.DB_HOST ?? 'localhost';
        const port: number = Number(process.env.DB_PORT ?? 5432);
        const username: string = process.env.DB_USER ?? 'postgres';
        const password: string = process.env.DB_PASSWORD ?? 'root';
        const database: string = process.env.DB_NAME ?? 'check_db';

        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          autoLoadEntities: true,
          synchronize: true, // ✅ JAMAIS en prod
        };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true, // <--- TRÈS IMPORTANT
    }),
    CarsModule,
    AssurancesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
