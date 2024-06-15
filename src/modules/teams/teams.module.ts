import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { Team } from './entities/team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindManyCartolaApi } from './services/find-many-cartola-api.service';
import { CreateOneTeamService } from './services/create-one-team.service';
import { FindOneTeamService } from './services/find-one-team.service';
import { UpdateOneTeamService } from './services/update-one-team.service';
import { DeleteOneTeamService } from './services/delete-one-team.service';
import { FindManyTeamService } from './services/find-many-team.service';
import { Config } from './entities/config.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Config])],
  controllers: [TeamsController],
  providers: [
    FindManyCartolaApi,
    CreateOneTeamService,
    FindOneTeamService,
    UpdateOneTeamService,
    DeleteOneTeamService,
    FindManyTeamService,
  ],
})
export class TeamsModule {}
