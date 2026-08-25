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
import { PlanningService } from './planning.service';
import { CreatePlanningDto } from './dto/create-planning.dto';
import { UpdatePlanningDto } from './dto/update-planning.dto';
import { WarningsService } from '../warnings/warnings.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('planning')
export class PlanningController {
  constructor(
    private readonly planningService: PlanningService,
    private readonly warningsService: WarningsService,
  ) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(
    @Body('warning') warningId: number[],
    @Body() createPlanningDto: CreatePlanningDto,
  ) {
    if (!warningId) {
      return 'No warning selected';
    }
    const planning = await this.planningService.create(createPlanningDto);
    if (warningId && warningId.length > 1) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      warningId.map(async (id) => {
        await this.warningsService.update(id, { planningId: planning });
      });
    } else if (warningId && warningId.length === 1) {
      await this.warningsService.update(warningId[0], { planningId: planning });
    }
    return planning;
  }

  @Get()
  findAll() {
    return this.planningService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.planningService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlanningDto: UpdatePlanningDto,
  ) {
    return this.planningService.update(+id, updatePlanningDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planningService.remove(+id);
  }
}
