import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({
    example: 'Santos',
    description: 'The name of the team',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
  name: string;

  @ApiProperty({
    example: 'SAN',
    description: 'The abbreviation of the team',
  })
  @IsNotEmpty()
  @IsString()
  abbreviation: string;
  abbreviation: string;

  @ApiProperty({
    example: 'santos',
    description: 'The slug of the team',
  })
  @IsString()
  slug: string;
  slug: string;

  @ApiProperty({
    example: 'Peixe',
    description: 'The nickname of the team',
  })
  @IsString()
  nickname: string;
  nickname: string;

  @ApiProperty({
    example:
      'https://s.glbimg.com/es/sde/f/organizacoes/escudo_default_65x65.png',
    description: 'The shield of the team',
    example:
      'https://s.glbimg.com/es/sde/f/organizacoes/escudo_default_65x65.png',
    description: 'The shield of the team',
  })
  @IsNotEmpty()
  @IsString()
  shield: string;
  shield: string;

  @ApiProperty({
    example: 1,
    description: 'The external id of the team',
  })
  @IsOptional()
  @IsNumber()
  external_id: number;
  external_id: number;
}
