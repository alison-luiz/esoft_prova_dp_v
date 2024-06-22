import { QueryTemplateDto } from "@/shared/dtos/query-template.dto"
import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
import { Team } from "../entities/team.entity";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class FindManyTeamQueryDto extends QueryTemplateDto {
  @ApiPropertyOptional({
    example: 'Santos',
    description: 'Campo para busca de registros.'
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({
    example: 'name',
    description: 'Campo para ordenação dos registros.',
    enum: ['name', 'slug', 'abbreviation', 'nickname'],
    default: 'name'
  })
  @IsString()
  @IsOptional()
  orderBy?: 'name' | 'slug' | 'abbreviation' | 'nickname';

  @ApiPropertyOptional({
    example: 'ASC',
    description: 'Direção da ordenação dos registros.',
    enum: ['ASC', 'DESC'],
    default: 'ASC'
  })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.toUpperCase())
  orderDirection?: 'ASC' | 'DESC';
}

export interface PaginatedResultFindManyTeam {
  data: Team[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}
