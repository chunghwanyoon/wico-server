import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

export enum EmailAuthenticationType {
  'AUTHENTICATION',
  'RECOVER',
}

@Entity({ name: 'email_authentications' })
export class EmailAuthentication {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  /* relations */
  @ManyToOne(() => User, (user) => user.email_authentications)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ApiProperty()
  @Column({ type: 'int', default: 0 })
  _type: EmailAuthenticationType;

  @ApiProperty()
  @Column({ type: 'varchar' })
  token: string;

  @ApiProperty()
  @Column({ type: 'bool', default: false })
  is_used: boolean;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;
  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
