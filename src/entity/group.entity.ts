import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

export enum GroupStatus {
  'RELEASING',
  'PROCESSING',
  'COMPLETED',
  'CLOSED',
}

@Entity({ name: 'groups' })
export class Group {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  /* relations */
  @ManyToMany(() => User, (user) => user.groups, { cascade: true })
  users: User[];

  @ManyToMany(() => User, (user) => user.groups, { cascade: true })
  @JoinColumn({ name: 'master_id', referencedColumnName: 'id' })
  master: User;

  // tasks
  // request histories
  @ApiProperty()
  @Column({ type: 'varchar' })
  name: string;
  @ApiProperty()
  @Column({ type: 'int', default: 0 })
  status: GroupStatus;
  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  description: string;
  @ApiProperty()
  @Column({ type: 'int' })
  term: number;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;
  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
