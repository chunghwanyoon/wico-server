import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'user_secrets' })
export class UserSecret {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.user_secret)
  user: User;

  @Column({ type: 'varchar' })
  key: string;
  @Column({ type: 'varchar' })
  iv: string;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
