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
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  numCin!: string;

  @IsOptional()
  @IsString()
  firtName: string | undefined;

  @IsEmail()
  email!: string;

  @IsDate()
  birthday!: Date;

  @IsOptional()
  @IsString()
  contact?: string;

  @IsString()
  profilPath?: string;

  @IsOptional()
  @IsString()
  speciality: string | undefined;

  @IsOptional()
  @IsString()
  numDrivingLicense: string | undefined;

  @IsString()
  adress!: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password!: string;

  @IsEnum(UserRole)
  role?: UserRole;

  @IsBoolean()
  acces: boolean = true;

  @IsEnum(UserStatus)
  status?: UserStatus;
}
