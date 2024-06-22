import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequestBody {
  @ApiProperty({
    example: 'joão.silva@gmail.com',
    description: 'Email para login do usuário.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'senha123',
    description: 'Senha para login do usuário.',
  })
  @IsString()
  password: string;
}
