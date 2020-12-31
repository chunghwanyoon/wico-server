import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { EntityRepository, getCustomRepository } from 'typeorm';
import { User, UserType, UserStatus } from '../entity/user.entity';
import { SignUpDto } from '../auth/dto/SignUpDto';

@EntityRepository(User)
export class UserHandler extends BaseRepository<User> {
  async findUserById(user_id: number): Promise<User | undefined> {
    const user: User = await this.findOne(user_id);
    if (!user) return undefined;
    return user;
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user: User = await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.user_secret', 'user_secret')
      .where('user.email = :email', { email: email })
      .addSelect('user.password')
      .getOne();
    if (!user) return undefined;
    return user;
  }

  async buildUser(params: SignUpDto, key: string, iv: string): Promise<User> {
    const user: User = await this.save({ ...params, user_secret: { key: key, iv: iv } });
    return user;
  }
}
