import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  abbreviation: string;

  @Column()
  @IsString()
  slug: string;

  @Column()
  @IsString()
  nickname: string;

  @Column()
  @IsString()
  shield: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  external_id: number;
}
