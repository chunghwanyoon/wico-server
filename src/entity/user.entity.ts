import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserSecret } from './user_secret.entity';

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
  @OneToOne(() => UserSecret, (user_secret) => user_secret.user, { cascade: true })
  @JoinColumn({ name: 'user_secret_id', referencedColumnName: 'id' })
  user_secret: UserSecret;

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

  /* timestamps */
  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;
  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
