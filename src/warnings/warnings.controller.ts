import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { WarningsService } from './warnings.service';
import { CreateWarningDto } from './dto/create-warning.dto';
import { UpdateWarningDto } from './dto/update-warning.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('warnings')
export class WarningsController {
  constructor(private readonly warningsService: WarningsService) {}

  @Post(':id')
  @UseInterceptors(AnyFilesInterceptor())
  create(@Param('id') id: number, @Body() createWarningDto: CreateWarningDto) {
    console.log('createWarningDto:', createWarningDto);
    return this.warningsService.create(id, createWarningDto);
  }

  @Get()
  findAll() {
    return this.warningsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.warningsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(AnyFilesInterceptor())
  update(@Param('id') id: string, @Body() updateWarningDto: UpdateWarningDto) {
    return this.warningsService.update(+id, updateWarningDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.warningsService.remove(id);
  }
}
