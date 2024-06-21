import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from '../../modules/logs/entities/log.entity';

@Injectable()
export class ExecutionTimeMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', async () => {
      const end = Date.now();
      const duration = end - start;

      const log = new Log();
      log.route = req.originalUrl;
      log.method = req.method;
      log.body = JSON.stringify(req.body);
      log.query = JSON.stringify(req.query);
      log.params = JSON.stringify(req.params);
      log.status = res.statusCode;
      log.duration = duration;
      if ((req as any).user && (req as any).user.id) {
        log.user_id = (req as any).user.id;
      } else {
        log.user_id = null;
      }

      if (log.user_id === null) return

      await this.logRepository.save(log);
    });
    next();
  }
}
