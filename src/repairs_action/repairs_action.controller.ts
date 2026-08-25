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
import { RepairsActionService } from './repairs_action.service';
import { CreateRepairsActionDto } from './dto/create-repairs_action.dto';
import { UpdateRepairsActionDto } from './dto/update-repairs_action.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('repairs-action')
export class RepairsActionController {
  constructor(private readonly repairsActionService: RepairsActionService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  create(@Body() createRepairsActionDto: CreateRepairsActionDto) {
    return this.repairsActionService.create(createRepairsActionDto);
  }

  @Get()
  findAll() {
    return this.repairsActionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repairsActionService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(AnyFilesInterceptor())
  update(
    @Param('id') id: string,
    @Body() updateRepairsActionDto: UpdateRepairsActionDto,
  ) {
    return this.repairsActionService.update(+id, updateRepairsActionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repairsActionService.remove(+id);
  }
}
