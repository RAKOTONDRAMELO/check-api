// src/users/dto/create-user.dto.ts

import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole, UserStatus } from '../enum';

export class CreateUserDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  name!: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  numCin!: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  firtName: string | undefined;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEmail()
  email!: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsDate()
  birthday!: Date;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  contact?: string;

  @IsString()
  profilPath?: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  speciality: string | undefined;

  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  numDrivingLicense: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  adress!: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @MinLength(6)
  password!: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEnum(UserRole)
  role?: UserRole;

  @IsBoolean()
  acces: boolean = true;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEnum(UserStatus)
  status?: UserStatus;
}
