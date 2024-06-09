import { InjectRepository } from "@nestjs/typeorm";
import { Team } from "../entities/team.entity";
import { Repository } from "typeorm";
import { HttpStatus, Injectable } from "@nestjs/common";
import axios from "axios";
import { CreateOneTeamService } from "./create-one-team.service";
import { AppError } from "@/shared/utils/appError.exception";
import { CreateTeamDto } from "../dto/create-team.dto";

@Injectable()
export class FindManyCartolaApi {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    private readonly createOneTeamService: CreateOneTeamService
  ) {}

  async execute(): Promise<CreateTeamDto[]> {
    const url = `${process.env.CARTOLA_API_URL}/clubes`
    const response = await axios.get(url);
    const { data } = response
    const queryRunner = this.teamRepository.manager.connection.createQueryRunner()
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const teams: CreateTeamDto[] = []
    try {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const team = data[key];
          const createTeam: CreateTeamDto = {
            name: team?.nome,
            abbreviation: team?.abreviacao,
            nickname: team?.apelido,
            slug: team?.slug,
            shield: Object.values(team?.escudos)[0] as string,
            external_id: team?.id
          }
          teams.push(createTeam)
          await this.createOneTeamService.execute(createTeam);
        }
      }
      await queryRunner.commitTransaction();
      return teams
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new AppError({
        id: 'ERROR_FIND_MANY_CARTOLA',
        message: 'Error to get many teams cartola',
        status: HttpStatus.BAD_REQUEST,
        error
      })
    } finally {
      await queryRunner.release();
    }
  }
}