import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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
  @PrimaryGeneratedColumn()
  id: number;

  /* relations */

  /* properties */
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar', unique: true })
  nickname: string;
  @Column({ type: 'varchar', unique: true })
  email: string;
  @Column({ type: 'varchar', select: false })
  password: string;
  @Column({ type: 'varchar', nullable: true })
  phone_number: string;
  @Column({ type: 'int', default: 0 })
  _type: UserType;
  @Column({ type: 'int', default: 0 })
  status: UserStatus;

  /* timestamps */
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
