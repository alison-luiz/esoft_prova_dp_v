import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../entities/team.entity';
import { FindOneTeamService } from './find-one-team.service';
import { AppError } from '../../../shared/utils/appError.exception';

@Injectable()
export class DeleteOneTeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    private readonly findOneTeamService: FindOneTeamService,
  ) {}

  async execute(id: string): Promise<void> {
    try {
      await this.findOneTeamService.execute(id);
      await this.teamRepository.delete(id);
    } catch (error) {
      throw new AppError({
        id: 'ERROR_DELETE_ONE_TEAM',
        message: 'Error to delete one team',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
