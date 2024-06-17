import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './shared/database/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { TeamsModule } from './modules/teams/teams.module';
import { LogsModule } from './modules/logs/logs.module';
import { ExecutionTimeMiddleware } from './shared/middleware/execution-time.middleware';
import { TeamsController } from './modules/teams/teams.controller';
import { DatabaseService } from './shared/database/database.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        DatabaseConfig.createTypeOrmOptions(configService),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    TeamsModule,
    LogsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    DatabaseService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExecutionTimeMiddleware).forRoutes(TeamsController);
  }
}
