import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'João',
    description: 'Primeiro nome do usuário.'
  })
  @IsString()
  first_name: string;

  @ApiProperty({
    example: 'Silva',
    description: 'Sobrenome do usuário.'
  })
  @IsString()
  last_name: string;

  @ApiProperty({
    example: 'joão.silva@gmail.com',
    description: 'Email para cadastro do usuário.'
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    example: 'senha123',
    description:
      'Senha para cadastro do usuário. Deve conter no mínimo 4 caracteres e no máximo 20.'
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
