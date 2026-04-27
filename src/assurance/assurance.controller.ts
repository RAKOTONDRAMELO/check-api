import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateAssuranceDto } from './dto/create-assurance.dto';
import { AssurancesService } from './assurance.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('assurances')
export class AssurancesController {
  constructor(private readonly assurancesService: AssurancesService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'assurance', maxCount: 2 }], {
      storage: diskStorage({
        destination: './uploads/assurances',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        cb(null, allowedTypes.includes(file.mimetype));
      },
      limits: { fileSize: 10 * 1024 * 1024 }, // 10 Mo
    }),
  )
  create(
    @Body() dto: CreateAssuranceDto,
    @UploadedFiles() files: { assurance?: Express.Multer.File[] },
  ) {
    return this.assurancesService.create(dto, files);
  }

  @Get()
  findAll() {
    return this.assurancesService.findAll();
  }

  @Get('car/:id')
  findByCar(@Param('id', ParseIntPipe) id: number) {
    return this.assurancesService.findByCar(id);
  }
}
