import { Log } from '../../modules/logs/entities/log.entity';
import { Config } from '../../modules/teams/entities/config.entity';
import { Team } from '../../modules/teams/entities/team.entity';
import { User } from '../../modules/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Migrations1718484039104 } from './migrations/1718484039104-AddUserTable';

export class DatabaseConfig {
  static createTypeOrmOptions(
    configService: ConfigService,
  ): TypeOrmModuleOptions {
    return {
      url: configService.get('DATABASE_URL'),
      ssl: false,
      useUTC: true,
      type: 'postgres',
      entities: [User, Team, Log, Config],
      synchronize: false,
      connectTimeoutMS: 30000,
      migrationsRun: false,
      migrations: [Migrations1718484039104],
    };
  }
}
