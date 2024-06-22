import { Controller, Get, Query, Req } from "@nestjs/common";
import { LogsService } from "./logs.service";
import { Request } from "express";
import { FindManyLogsQueryDto } from "./dto/find-many-logs.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Sistema de Logs')
@Controller('logs')
export class LogsController {
  constructor(
    private readonly logsService: LogsService,
  ) {}

  @Get()
  async findAll(
    @Req() req: Request,
    @Query() query: FindManyLogsQueryDto
  ) {
    return this.logsService.findAll((req as any).user.id, query);
  }
}
