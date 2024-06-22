import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Log } from "./entities/log.entity";
import { Repository } from "typeorm";
import { FindManyLogsQueryDto, PaginatedResultFindManyLogs } from "./dto/find-many-logs.dto";

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
  ) {}

  async findAll(
    userId: string,
    findManyLogsQueryDto: FindManyLogsQueryDto
  ): Promise<PaginatedResultFindManyLogs> {
    const { page = 1, limit = 10 } = findManyLogsQueryDto

    const queryBuilder = this.logRepository
    .createQueryBuilder('log')
    .where('log.user_id = :userId', { userId })

    if (findManyLogsQueryDto.method) {
      queryBuilder.andWhere('log.method = :method', { method: findManyLogsQueryDto.method })
    }

    if (findManyLogsQueryDto.orderBy) {
      queryBuilder.orderBy(`log.${findManyLogsQueryDto.orderBy}`, findManyLogsQueryDto.orderDirection)
    } else {
      queryBuilder.orderBy('log.created_at', 'DESC')
    }

    const [data, count] = await queryBuilder
      .skip((+page - 1) * +limit)
      .take(+limit)
      .getManyAndCount()

    const totalPages = Math.ceil(count / +limit)
    
    const from = (+page - 1) * +limit + 1
    const to = (+page - 1) * +limit + data.length

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
    }
  }
}
