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
import { RepairsPlanningService } from './repairs_planning.service';
import { CreateRepairsPlanningDto } from './dto/create-repairs_planning.dto';
import { UpdateRepairsPlanningDto } from './dto/update-repairs_planning.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('repairs-planning')
export class RepairsPlanningController {
  constructor(
    private readonly repairsPlanningService: RepairsPlanningService,
  ) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  create(@Body() createRepairsPlanningDto: CreateRepairsPlanningDto) {
    return this.repairsPlanningService.create(createRepairsPlanningDto);
  }

  @Get()
  findAll() {
    return this.repairsPlanningService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repairsPlanningService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(AnyFilesInterceptor())
  update(
    @Param('id') id: string,
    @Body() updateRepairsPlanningDto: UpdateRepairsPlanningDto,
  ) {
    return this.repairsPlanningService.update(+id, updateRepairsPlanningDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repairsPlanningService.remove(+id);
  }
}
