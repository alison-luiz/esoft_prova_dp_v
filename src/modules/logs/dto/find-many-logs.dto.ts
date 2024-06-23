import { QueryTemplateDto } from "../../../shared/dtos/query-template.dto"
import { Log } from "../entities/log.entity";
import { IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class FindManyLogsQueryDto extends QueryTemplateDto {
  @ApiPropertyOptional({
    example: 'status',
    description: 'Campo para ordenação dos registros.',
    enum: ['status', 'duration', 'method', 'route', 'created_at'],
    default: 'created_at'
  })
  @IsString()
  @IsOptional()
  orderBy?: 'status' | 'duration' | 'method' | 'route' | 'created_at';

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

  @ApiPropertyOptional({
    example: 'GET',
    description: 'Método da requisição.',
    enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  })
  @IsOptional()
  @IsString()
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
}

export interface PaginatedResultFindManyLogs {
  data: Log[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
} 
