import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { FindManyCartolaApi } from './services/find-many-cartola-api.service';
import { FindOneTeamService } from './services/find-one-team.service';

@Controller('teams')
export class TeamsController {
  constructor(
    private readonly findManyCartolaAPI: FindManyCartolaApi,
    private readonly findOneTeamService: FindOneTeamService,
  ) {}

  @Get('/seed')
  execute() {
    return this.findManyCartolaAPI.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneTeamService.execute(id);
  }
}
