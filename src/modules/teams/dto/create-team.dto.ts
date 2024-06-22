import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({
    example: 'Santos',
    description: 'Nome para cadastro do time.',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'SAN',
    description: 'Abreviação do nome do time.',
  })
  @IsNotEmpty()
  @IsString()
  abbreviation: string;

  @ApiPropertyOptional({
    example: 'santos',
    description: 'Slug do nome do time.',
  })
  @IsString()
  @IsOptional()
  slug: string;

  @ApiPropertyOptional({
    example: 'Peixe',
    description: 'Apelido do time.',
  })
  @IsString()
  @IsOptional()
  nickname: string;

  @ApiPropertyOptional({
    example:
      'https://s.glbimg.com/es/sde/f/organizacoes/escudo_default_65x65.png',
    description: 'Escudo do time.',
  })
  @IsString()
  @IsOptional()
  shield: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'ID externo do time.',
  })
  @IsOptional()
  @IsNumber()
  external_id: number;
}
