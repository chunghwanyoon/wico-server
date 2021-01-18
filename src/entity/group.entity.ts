import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

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
  @OneToMany(() => User, (user) => user.group, { eager: true })
  members: User[];

  // tasks
  // request histories

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
