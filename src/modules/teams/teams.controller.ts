import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { FindManyCartolaApi } from './services/find-many-cartola-api.service';
import { FindOneTeamService } from './services/find-one-team.service';
import { FindManyTeamService } from './services/find-many-team.service';
import { CreateOneTeamService } from './services/create-one-team.service';
import { UpdateOneTeamService } from './services/update-one-team.service';
import { DeleteOneTeamService } from './services/delete-one-team.service';

@Controller('teams')
export class TeamsController {
  constructor(
    private readonly findManyCartolaAPI: FindManyCartolaApi,
    private readonly findOneTeamService: FindOneTeamService,
    private readonly findManyTeamService: FindManyTeamService,
    private readonly createOneTeamService: CreateOneTeamService,
    private readonly updateOneTeamService: UpdateOneTeamService,
    private readonly deleteOneTeamService: DeleteOneTeamService,
  ) {}

  @Get('/seed')
  seed() {
    return this.findManyCartolaAPI.execute();
  }

  @Get()
  findAll() {
    return this.findManyTeamService.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneTeamService.execute(id);
  }

  @Post()
  createOne(@Req() req: Request, @Body() createTeamDto: CreateTeamDto) {
    return this.createOneTeamService.execute(
      createTeamDto,
      (req as any).user.id,
    );
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.updateOneTeamService.execute(id, updateTeamDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.deleteOneTeamService.execute(id);
  }
}
