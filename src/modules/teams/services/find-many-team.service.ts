import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from '../entities/team.entity';
import { Repository } from 'typeorm';
import { AppError } from '../../../shared/utils/appError.exception';
import { FindManyTeamQueryDto, PaginatedResultFindManyTeam } from '../dto/find-many-team.dto';
@Injectable()
export class FindManyTeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async execute(findManyTeamQueryDto: FindManyTeamQueryDto): Promise<PaginatedResultFindManyTeam> {
    try {
      const { page = 1, limit = 10 } = findManyTeamQueryDto;

      const queryBuilder = this.teamRepository.createQueryBuilder('team');

      if (findManyTeamQueryDto.search) {
        queryBuilder.where(
          'team.name ILIKE :search OR team.slug ILIKE :search OR team.abbreviation ILIKE :search OR team.nickname ILIKE :search',
          {
            search: `%${findManyTeamQueryDto.search}%`,
          },
        );
      }

      if (findManyTeamQueryDto.orderBy) {
        queryBuilder.orderBy(`team.${findManyTeamQueryDto.orderBy}`, findManyTeamQueryDto.orderDirection || 'ASC');
      } else {
        queryBuilder.orderBy('team.name', 'ASC');
      }

      const [data, count] = await queryBuilder
        .skip((+page - 1) * +limit)
        .take(+limit)
        .getManyAndCount();

      const totalPages = Math.ceil(count / +limit);

      const from = (+page - 1) * +limit + 1;
      const to = (+page - 1) * +limit + data.length;

      return {
        data: data,
        meta: {
          current_page: +page,
          from: from > count ? count : from,
          last_page: totalPages,
          per_page: +limit,
          to: to > count ? count : to,
          total: count,
        },
      };
    } catch (error) {
      throw new AppError({
        id: 'ERROR_FIND_MANY_TEAM',
        message: 'Error to find many teams',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
