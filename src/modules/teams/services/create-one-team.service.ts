import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from '../entities/team.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from '../dto/create-team.dto';
import { AppError } from '@/shared/utils/appError.exception';

@Injectable()
export class CreateOneTeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async execute(team: CreateTeamDto, createdBy: string): Promise<Team> {
    const teamAlreadyExists = await this.teamRepository.findOne({
      where: {
        name: team.name,
      },
    });
    if (teamAlreadyExists) {
      throw new AppError({
        id: 'TEAM_ALREADY_EXISTS',
        message: 'Team already exists',
        status: HttpStatus.BAD_REQUEST,
      });
    }
    try {
      const newTeam = this.teamRepository.create({
        ...team,
        created_by: createdBy,
      });
      return await this.teamRepository.save(newTeam);
    } catch (error) {
      throw new AppError({
        id: 'ERROR_TO_CREATE_TEAM',
        message: 'Error to create new team',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
