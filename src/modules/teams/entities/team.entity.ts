import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  abbreviation: string;

  @Column({ nullable: true })
  slug: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  shield: string;

  @Column({ nullable: true })
  external_id: number;

  @Column()
  created_by: string;
}
