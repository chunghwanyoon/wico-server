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
      .where('user.email = :email', { email: email })
      .addSelect('user.password')
      .addSelect('user.auth_secret')
      .getOne();
    if (!user) return undefined;
    return user;
  }

  async buildUser(params: SignUpDto, auth_secret: string): Promise<User> {
    const user: User = await this.save({ ...params, auth_secret});
    return user;
  }
}
