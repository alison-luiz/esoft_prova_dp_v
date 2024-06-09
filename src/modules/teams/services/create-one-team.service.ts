import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Team } from "../entities/team.entity";
import { Repository } from "typeorm";
import { CreateTeamDto } from "../dto/create-team.dto";
import { AppError } from "@/shared/utils/appError.exception";

@Injectable()
export class CreateOneTeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>
  ) {}

  async execute(team: CreateTeamDto): Promise<Team> {
    const teamAlreadyExists = await this.teamRepository.findOne({
      where: {
        name: team.name
      }
    })
    if (teamAlreadyExists) {
      throw new AppError({
        id: 'TEAM_ALREADY_EXISTS',
        message: 'Team already exists',
        status: HttpStatus.BAD_REQUEST
      })
    }
    try {
      const createdTeam = await this.teamRepository.save(team)
      return createdTeam
    } catch (error) {
      throw new AppError({
        id: 'ERROR_TO_CREATE_TEAM',
        message: 'Error to create new team',
        status: HttpStatus.BAD_REQUEST
      })
    }
  }
}