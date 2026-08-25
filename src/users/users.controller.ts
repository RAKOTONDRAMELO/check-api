/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  StreamableFile,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
// import { User } from './entities/user.entity';
import {
  FileFieldsInterceptor,
  // FileInterceptor,
} from '@nestjs/platform-express';

import type { Response } from 'express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { createReadStream } from 'fs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from './enum';
import { RolesGuard } from 'src/auth/roles.guard';
// import { Roles } from 'src/auth/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private configService: ConfigService,
  ) {}
  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req) {
    const me = this.usersService.findOne(req.user.userId);
    return me;
  }
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  getUsers() {
    const data = this.usersService.findAll();
    return data;
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  getUser(@Param('id') id: number) {
    const data = this.usersService.findOne(id);
    return data;
  }
  @Get('/download/photo/:src/:module/:foldername/:filename')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  downloadImg(
    @Param('src') src: string,
    @Param('module') _module: string,
    @Param('foldername') foldername: string,
    @Param('filename') filename: string,
    @Res({ passthrough: true }) res: Response,
  ): StreamableFile {
    const filePath = join(
      process.cwd(),
      src + '\\' + _module + '\\' + foldername + '\\' + filename,
    );
    const file = createReadStream(filePath);
    console.log(foldername + filename);
    // On définit les en-têtes pour forcer le téléchargement
    res.set({
      'Content-Type': 'image/webp',
      'Content-Disposition': 'attachment; filename="ma-super-image.webp"',
    });
    return new StreamableFile(file);
  }

  @Get('/download/pdf/:filename')
  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(UserRole.ADMIN)
  downloadPdf(
    @Param('filename') filename: string,
    @Res({ passthrough: true }) res: Response,
  ): StreamableFile {
    const filePath = join(process.cwd(), 'uploads', 'users', 'cv', filename);

    // ✅ Vérification fichier
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Fichier introuvable');
    }

    const file = createReadStream(filePath);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
    });

    return new StreamableFile(file);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  // @UseInterceptors(FileInterceptor('profil'))
  // @UseInterceptors(FileInterceptor('cv'))
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'profil', maxCount: 1 },
        { name: 'photo_cin', maxCount: 2 },
        { name: 'photo_permis', maxCount: 2 },
        { name: 'cv', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: (req, file, cb) => {
            let folder = 'uploads/users';

            if (file.fieldname === 'profil') {
              folder = 'uploads/users/photo_profils';
            }

            if (file.fieldname === 'photo_cin') {
              folder = 'uploads/users/photo_cin';
            }

            if (file.fieldname === 'photo_permis') {
              folder = 'uploads/users/photo_permis';
            }

            if (file.fieldname === 'cv') {
              folder = 'uploads/users/cv';
            }

            if (file.fieldname === 'permis') {
              folder = 'uploads/users/photo_permis';
            }

            // ✅ création automatique du dossier
            if (!fs.existsSync(folder)) {
              fs.mkdirSync(folder, { recursive: true });
            }

            if (file.fieldname === 'profil') {
              folder = 'uploads/users/photo_profils';
            }

            if (file.fieldname === 'photo_cin') {
              folder = 'uploads/users/photo_cin';
            }

            if (file.fieldname === 'photo_permis') {
              folder = 'uploads/users/photo_permis';
            }

            if (file.fieldname === 'cv') {
              folder = 'uploads/users/cv';
            }

            cb(null, folder);
          },

          filename: (req, file, cb) => {
            const userName = req.body.name || 'user';
            const uniqueName =
              file.fieldname +
              '-' +
              userName +
              '-' +
              Date.now() +
              '-' +
              Math.round(Math.random() * 1e9);

            cb(null, uniqueName + extname(file.originalname));
          },
        }),
      },
    ),
  )
  create(
    @UploadedFiles()
    files: {
      profil?: Express.Multer.File[];
      photo_cin?: Express.Multer.File[];
      photo_permis?: Express.Multer.File[];
      cv?: Express.Multer.File[];
    },
    @Body()
    dto: CreateUserDto,
  ) {
    dto.profilPath = files.profil?.[0].path;
    // console.log(files); // fichier
    const drivingLicenseUrl = {
      front: files.photo_permis?.[0].path,
      back: files.photo_permis?.[1].path,
    };
    console.log(dto);
    const data = this.usersService.create(
      dto,
      files.photo_cin?.[0].path, //urlfrontCIN
      files.photo_cin?.[1].path, //urlBackCIN
      drivingLicenseUrl,
      files.cv?.[0].path, //urlCV
    );
    return {
      message: 'Utilisateur créé',
      data: data,
    };
  }
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  // @UseInterceptors(FileInterceptor('profil'))
  // @UseInterceptors(FileInterceptor('cv'))
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'profil', maxCount: 1 },
        { name: 'photo_cin', maxCount: 2 },
        { name: 'photo_permis', maxCount: 2 },
        { name: 'cv', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: (req, file, cb) => {
            let folder = 'uploads/users';

            if (file.fieldname === 'profil') {
              folder = 'uploads/users/photo_profils';
            }

            if (file.fieldname === 'photo_cin') {
              folder = 'uploads/users/photo_cin';
            }

            if (file.fieldname === 'photo_permis') {
              folder = 'uploads/users/photo_permis';
            }

            if (file.fieldname === 'cv') {
              folder = 'uploads/users/cv';
            }

            if (file.fieldname === 'permis') {
              folder = 'uploads/users/photo_permis';
            }

            // ✅ création automatique du dossier
            if (!fs.existsSync(folder)) {
              fs.mkdirSync(folder, { recursive: true });
            }

            if (file.fieldname === 'profil') {
              folder = 'uploads/users/photo_profils';
            }

            if (file.fieldname === 'photo_cin') {
              folder = 'uploads/users/photo_cin';
            }

            if (file.fieldname === 'photo_permis') {
              folder = 'uploads/users/photo_permis';
            }

            if (file.fieldname === 'cv') {
              folder = 'uploads/users/cv';
            }

            cb(null, folder);
          },

          filename: (req, file, cb) => {
            const userName = req.body.nom || 'user';
            const uniqueName =
              file.fieldname +
              '-' +
              userName +
              '-' +
              Date.now() +
              '-' +
              Math.round(Math.random() * 1e9);

            cb(null, uniqueName + extname(file.originalname));
          },
        }),
      },
    ),
  )
  update(
    @Param('id') id: number,
    @UploadedFiles()
    files: {
      profil?: Express.Multer.File[];
      photo_cin?: Express.Multer.File[];
      photo_permis?: Express.Multer.File[];
      cv?: Express.Multer.File[];
    },
    @Body() dto: UpdateUserDto,
  ) {
    // const host = this.configService.get<string>('APP_URL');
    // const baseUrl = `${host}/`;

    if (files.profil) {
      dto.profilPath = files.profil?.[0].path;
    }

    // console.log(files); // fichier
    const drivingLicenseUrl = {
      front: files.photo_permis?.[0].path,
      back: files.photo_permis?.[1].path,
    };

    console.log(dto);
    // console.log(dto);
    return this.usersService.update(
      id,
      dto,
      files.photo_cin?.[0].path, //urlfrontCIN
      files.photo_cin?.[1].path, //urlBackCIN
      drivingLicenseUrl,
      files.cv?.[0].path, //urlCV
    );
  }
  @Put(':id/disable')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  disable(@Param('id') id: number) {
    console.log('disable user with id : ', id);
    return this.usersService.update(id, { acces: false });
  }
  @Put(':id/enable')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  enable(@Param('id') id: number) {
    console.log('enable user with id : ', id);
    return this.usersService.update(id, { acces: true });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
