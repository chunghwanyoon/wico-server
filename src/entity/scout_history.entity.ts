import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Group } from './group.entity';
import { User } from './user.entity';

export enum ScoutHistoryStatus {
  'CANCELLED',
  'ACTIVE',
  'EXPIRED',
}

@Entity({ name: 'scout_histories' })
export class ScoutHistory {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  /* relations */
  @ApiProperty()
  @ManyToOne(() => User, (user) => user.scout_histories)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ApiProperty()
  @ManyToOne(() => Group, (group) => group.scout_histories)
  @JoinColumn({ name: 'group_id', referencedColumnName: 'id' })
  group: Group;

  /* properties */
  @ApiProperty()
  @Column({ type: 'int', default: 1 })
  status: ScoutHistoryStatus;

  @ApiProperty()
  @Column({ type: 'varchar' })
  title: string;
  @ApiProperty()
  @Column({ type: 'text' })
  detail: string;

  @ApiProperty()
  @Column({ type: 'bool', default: false })
  expired: boolean;
  @ApiProperty()
  @Column({ type: 'bool', default: false })
  cancelled: boolean;
  @ApiProperty()
  @Column({ type: 'bool', default: false })
  accepted: boolean;

  /* timestamps */
  @ApiProperty()
  @Column({ type: 'date', nullable: true })
  accpeted_at: Date;
  @ApiProperty()
  @Column({ type: 'date', nullable: true })
  expired_at: Date;
  @ApiProperty()
  @Column({ type: 'date', nullable: true })
  cancelled_at: Date;
  @ApiProperty()
  @Column({ type: 'date' })
  expired_scheduled_at: Date;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;
  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
