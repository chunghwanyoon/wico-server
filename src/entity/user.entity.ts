import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Group } from './group.entity';

export enum UserStatus {
  'WAINING_AUTH',
  'ACTIVE',
  'INACTIVE',
}

export enum UserType {
  'COMMON',
  'SUPER_ADMIN',
  'ADMIN',
}

@Entity({ name: 'users' })
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  /* relations */
  @ManyToMany(() => Group, (group) => group.users)
  @JoinColumn({ name: 'group_id', referencedColumnName: 'id' })
  groups: Group[];

  /* properties */
  @ApiProperty()
  @Column({ type: 'varchar' })
  name: string;
  @ApiProperty()
  @Column({ type: 'varchar', unique: true })
  nickname: string;
  @ApiProperty()
  @Column({ type: 'varchar', unique: true })
  email: string;
  @Column({ type: 'varchar', select: false })
  password: string;
  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  phone_number: string;
  @ApiProperty()
  @Column({ type: 'int', default: 0 })
  _type: UserType;
  @ApiProperty()
  @Column({ type: 'int', default: 0 })
  status: UserStatus;
  @Column({ type: 'varchar', select: false })
  auth_secret: string;

  /* timestamps */
  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;
  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
