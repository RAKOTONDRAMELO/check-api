/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  // Patch,
  // Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';

import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
// import { UpdateCarDto } from './dto/update-car.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserRole } from 'src/users/enum';
import { Roles } from 'src/auth/roles.decorator';
import * as fs from 'fs';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.FLEETMANAGEMENT)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'photo_car', maxCount: 1 },
        { name: 'photo_stat', maxCount: 2 },
        { name: 'photo_nif', maxCount: 2 },
        { name: 'photo_registration_card', maxCount: 2 },
      ],
      {
        storage: diskStorage({
          destination: (req, file, cb) => {
            let folder = 'uploads/cars';

            if (file.fieldname === 'photo_car') {
              folder = folder + '/photo_car';
            }

            if (file.fieldname === 'photo_stat') {
              folder = folder + '/photo_stat';
            }

            if (file.fieldname === 'photo_nif') {
              folder = folder + '/photo_nif';
            }

            if (file.fieldname === 'photo_registration_card') {
              folder = folder + '/photo_registration_card';
            }

            // ✅ création automatique du dossier
            if (!fs.existsSync(folder)) {
              fs.mkdirSync(folder, { recursive: true });
            }

            cb(null, folder);
          },

          filename: (req, file, cb) => {
            const carName = req.body.registrationNumber || 'car';
            const uniqueName =
              file.fieldname +
              '-' +
              carName +
              '-' +
              Date.now() +
              '-' +
              Math.round(Math.random() * 1e9);

            cb(null, uniqueName + extname(file.originalname));
          },
        }),
        fileFilter: (req, file, cb) => {
          const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
          cb(null, allowedTypes.includes(file.mimetype));
        },
        limits: { fileSize: 10 * 1024 * 1024 },
      },
    ),
  )
  create(
    @Body() dto: CreateCarDto,
    @UploadedFiles()
    files: {
      photo_car?: Express.Multer.File[];
      photo_stat?: Express.Multer.File[];
      photo_nif?: Express.Multer.File[];
      photo_registration_card?: Express.Multer.File[];
    },
  ) {
    // if (
    //   !files?.photo_registration_card ||
    //   files.photo_registration_card.length < 2
    // ) {
    //   throw new BadRequestException('Carte grise recto et verso obligatoires');
    // }
    dto.photoCarPath = files.photo_car?.[0].path;
    // console.log(files); // fichier
    // const nifUrls = {
    //   front: files.photo_nif?.[0].path,
    //   back: files.photo_nif?.[1].path,
    // };
    // const statUrls = {
    //   front: files.photo_stat?.[0].path,
    //   back: files.photo_stat?.[1].path,
    // };
    // const registrationCardUrls = {
    //   front: files.photo_registration_card[0].path,
    //   back: files.photo_registration_card[1].path,
    // };
    console.log(dto);
    const data = this.carsService.create(dto, files);
    return {
      message: 'Voiture créée',
      data: data,
    };
  }

  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.findOne(id);
  }

  // @Patch(':id')
  // @UseInterceptors(
  //   FileFieldsInterceptor([{ name: 'photo_registration_card', maxCount: 2 }], {
  //     storage: diskStorage({
  //       destination: './uploads/cars',
  //       filename: (req, file, cb) => {
  //         const uniqueSuffix =
  //           Date.now() + '-' + Math.round(Math.random() * 1e9);
  //         cb(null, uniqueSuffix + extname(file.originalname));
  //       },
  //     }),
  //     fileFilter: (req, file, cb) => {
  //       const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  //       if (!allowedTypes.includes(file.mimetype)) {
  //         return cb(
  //           new BadRequestException('Type de fichier non autorisé'),
  //           false,
  //         );
  //       }
  //       cb(null, true);
  //     },
  //     limits: { fileSize: 10 * 1024 * 1024 },
  //   }),
  // )
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() dto: UpdateCarDto,
  //   @UploadedFiles()
  //   files: { photo_registration_card?: Express.Multer.File[] },
  // ) {
  //   return this.carsService.update(id, dto, files);
  // }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.carsService.remove(id);
  // }
}
