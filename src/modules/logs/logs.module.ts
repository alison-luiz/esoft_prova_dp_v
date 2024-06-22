import { Module } from '@nestjs/common';
import { Log } from './entities/log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  exports: [TypeOrmModule],
  controllers: [LogsController],
  providers: [LogsService],
})
export class LogsModule {}
