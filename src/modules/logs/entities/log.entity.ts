import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('logs')
export class Log {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  route: string;

  @Column()
  method: string;

  @Column()
  body: string;

  @Column()
  query: string;

  @Column()
  params: string;

  @Column()
  status: number;

  @Column()
  duration: number;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;
}
