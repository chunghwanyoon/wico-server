import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { EntityRepository } from 'typeorm';
import { User, UserType, UserStatus } from '../entity/user.entity';

@EntityRepository(User)
export class UserHandler extends BaseRepository<User> {
  async findUserById(user_id: number): Promise<User | undefined> {
    const user: User = await this.findOne(user_id);
    if (!user) return undefined;
    return user;
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user: User = await this.findOne({ where: { email: email }, select: ['password'] });
    if (!user) return undefined;
    return user;
  }
}
