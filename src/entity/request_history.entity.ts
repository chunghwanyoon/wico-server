import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Group } from './group.entity';
import { User } from './user.entity';

export enum RequestHistoryStatus {
  'CANCELLED',
  'ACTIVE',
  'EXPIRED',
}

@Entity({ name: 'request_histories' })
export class RequestHistory {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  /* relations */
  @ApiProperty()
  @ManyToOne(() => User, (user) => user.request_histories)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ApiProperty()
  @ManyToOne(() => Group, (group) => group.request_histories)
  @JoinColumn({ name: 'group_id', referencedColumnName: 'id' })
  group: Group;

  /* properties */
  @ApiProperty()
  @Column({ type: 'int', default: 1 })
  status: RequestHistoryStatus;

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
  accepted_at: Date;
  @ApiProperty()
  @Column({ type: 'date', nullable: true })
  expired_at: Date;
  @ApiProperty()
  @Column({ type: 'date', nullable: true })
  cancelled_at: Date;
  @ApiProperty()
  @Column({ type: 'date' })
  expire_scheduled_at: Date;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;
  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
