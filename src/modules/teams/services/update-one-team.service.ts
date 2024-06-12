import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../entities/team.entity';
import { FindOneTeamService } from './find-one-team.service';
import { UpdateTeamDto } from '../dto/update-team.dto';
import { AppError } from '@/shared/utils/appError.exception';

@Injectable()
export class UpdateOneTeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    private readonly findOneTeamService: FindOneTeamService,
  ) {}

  async execute(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    try {
      await this.findOneTeamService.execute(id);
      await this.teamRepository.update(id, updateTeamDto);
      return await this.findOneTeamService.execute(id);
    } catch (error) {
      throw new AppError({
        id: 'ERROR_UPDATE_ONE_TEAM',
        message: 'Error to update one team',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
