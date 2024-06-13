import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../entities/team.entity';
import { AppError } from '@/shared/utils/appError.exception';

@Injectable()
export class FindOneTeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async execute(id: string): Promise<Team> {
    try {
      const team = await this.teamRepository.findOne({
        where: {
          id,
        },
      });
      if (!team) {
        throw new AppError({
          id: 'TEAM_NOT_FOUND',
          message: 'Team not found',
          status: HttpStatus.NOT_FOUND,
        });
      }
      return team;
    } catch (error) {
      throw new AppError({
        id: 'ERROR_FIND_ONE_TEAM',
        message: 'Error to find one team',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
