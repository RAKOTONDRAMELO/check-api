// import { DrivingLicense } from './entities/driving_license.entity';
import {
  // ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create_user.dto';
import * as bcrypt from 'bcrypt';
// import * as generator from 'generate-password';
import { UpdateUserDto } from './dto/update_user.dto';
import { CIN } from './entities/cin.entity';
import { DrivingLicense } from './entities/driving_license.entity';
import { CV } from './entities/cv.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(CIN)
    private readonly cinRepo: Repository<CIN>,

    @InjectRepository(DrivingLicense)
    private readonly drivingLicenseRepo: Repository<DrivingLicense>,

    @InjectRepository(CV)
    private readonly cvRepo: Repository<CV>,
  ) {}

  // find all users
  findAll() {
    console.log('UsersService triggered');
    const users = this.userRepository.find({
      relations: ['cv', 'cin', 'drivingLicense'],
    });
    return users;
  }

  // find a user
  findOne(id: number) {
    console.log('UsersService findOne active');
    const user = this.userRepository.find({ where: { id } });
    return user;
  }

  // create a user
  async create(
    dto: CreateUserDto,
    frontPictureURL?: string,
    backPictureURL?: string,
    drivingLicenseURL?: { front?: string; back?: string },
    cvURL?: string,
    // files?: UploadFiles,
  ): Promise<string | number | undefined> {
    try {
      // const existing = await this.userRepository.findOne({
      //   where: { email: dto.email },
      // });

      // if (existing) {
      //   throw new ConflictException('Email already exists');
      // }

      // const password = generator.generate({
      //   length: 12, // desired length
      //   numbers: true, // include numbers
      //   symbols: true, // include symbols
      //   uppercase: true, // include uppercase letters
      //   lowercase: true, // include lowercase letters
      //   strict: true, // ensures at least one of each enabled character set is present
      // });

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user = this.userRepository.create({
        cin: this.cinRepo.create({
          num: dto.numCin,
          frontPicture: frontPictureURL,
          backPicture: backPictureURL,
        }),
        drivingLicense: this.drivingLicenseRepo.create({
          num: dto.numDrivingLicense,
          frontPicture: drivingLicenseURL?.front,
          backPicture: drivingLicenseURL?.back,
        }),
        ...dto,
        password: hashedPassword,
      });
      await this.userRepository.save(user);
      if (cvURL) {
        const cv = this.cvRepo.create({
          filePath: cvURL,
          user: { id: user.id },
        });
        await this.cvRepo.save(cv);
      }

      return user.id;
    } catch (error) {
      console.log('error :::: ', error);
    }
  }

  // -----------------------------
  // FIND BY EMAIL
  // -----------------------------
  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async update(
    id: number,
    dto: UpdateUserDto,
    frontPictureURL?: string,
    backPictureURL?: string,
    drivingLicenseURL?: { front?: string; back?: string },
    cvURL?: string,
  ) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['cin', 'drivingLicense'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Si password existe → hash
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    // Merge des données
    Object.assign(user, dto);
    Object.assign(user.cin, { num: dto.numCin });
    console.log('uptade service');
    console.log(drivingLicenseURL);
    if (frontPictureURL != undefined) {
      Object.assign(user.cin, { frontPicture: frontPictureURL });
    }

    if (backPictureURL != undefined) {
      Object.assign(user.cin, { backPicture: backPictureURL });
    }

    if (drivingLicenseURL != undefined) {
      if (!user.drivingLicense) {
        console.log('driving-assign');
        Object.assign(user, {
          drivingLicense: this.drivingLicenseRepo.create({
            num: dto.numDrivingLicense,
            frontPicture: drivingLicenseURL?.front,
            backPicture: drivingLicenseURL?.back,
          }),
        });
      } else {
        console.log('driving-maj2');
        Object.assign(user.drivingLicense, {
          num: dto.numDrivingLicense,
          frontPicture: drivingLicenseURL?.front,
          backPicture: drivingLicenseURL?.back,
        });
      }
    }
    console.log('uptade service fin');
    console.log(cvURL);
    // console.log(dto);

    if (cvURL) {
      const cv = this.cvRepo.create({
        filePath: cvURL,
        user: { id: id },
      });
      await this.cvRepo.save(cv);
    }

    return await this.userRepository.save(user);
  }
  async remove(id: number) {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }

    return { message: 'Deleted successfully' };
  }
}
