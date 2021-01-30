import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { RequestHistory } from './request_history.entity';
import { ScoutHistory } from './scout_history.entity';

export enum GroupStatus {
  'INACTIVE',
  'ACTIVE',
}

export enum RecruitStatus {
  'INACTIVE',
  'ACTIVE',
}

@Entity({ name: 'groups' })
export class Group {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  /* relations */
  @ApiProperty()
  @OneToMany(() => User, (user) => user.group, { eager: true })
  members: User[];

  @ApiProperty()
  @OneToMany(() => RequestHistory, (request_history) => request_history.group, { cascade: true })
  request_histories: RequestHistory[];
  @OneToMany(() => ScoutHistory, (scout_history) => scout_history.group, { cascade: true })
  scout_histories: ScoutHistory[];

  @ApiProperty()
  @Column({ type: 'varchar', unique: true })
  name: string;
  @ApiProperty()
  @Column({ type: 'int', default: 0 })
  status: GroupStatus;
  @ApiProperty()
  @Column({ type: 'int', default: 0 })
  recruit_status: RecruitStatus;
  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;
  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
