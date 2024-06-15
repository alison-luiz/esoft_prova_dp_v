import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from '../entities/team.entity';
import { Repository } from 'typeorm';
import { AppError } from '../../../shared/utils/appError.exception';

@Injectable()
export class FindManyTeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async execute(): Promise<Team[] | undefined> {
    try {
      const teams = await this.teamRepository.find();

      if (!teams) {
        throw new AppError({
          id: 'TEAMS_NOT_FOUND',
          message: 'Teams not found',
          status: HttpStatus.NOT_FOUND,
        });
      }

      return teams;
    } catch (error) {
      throw new AppError({
        id: 'ERROR_FIND_MANY_TEAM',
        message: 'Error to find many teams',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
