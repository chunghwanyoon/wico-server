import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { EntityRepository } from 'typeorm';
import { User, UserType, UserStatus, UserTeamSearchStatus } from '../entity/user.entity';
import { SignUpDto } from '../api/winteriscoming/v1/auth/dtos/signup.dto';
import { UpdateUserInformationDto, UpdateUserSearchStatusDto } from '../api/winteriscoming/v1/users/dtos/UpdateUserDto';

@EntityRepository(User)
export class UserHandler extends BaseRepository<User> {
  async findUserById(user_id: number): Promise<User | undefined> {
    const user: User = await this.findOne(user_id);
    if (!user) return undefined;
    return user;
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user: User = await this.createQueryBuilder('user').where('user.email = :email', { email: email }).addSelect('user.password').addSelect('user.auth_secret').getOne();
    if (!user) return undefined;
    return user;
  }

  async buildUser(params: SignUpDto, auth_secret: string): Promise<User> {
    const user: User = await this.save({ ...params, auth_secret });
    return user;
  }

  async findTeamJoinActiveUsers(): Promise<User[]> {
    /* TODO: limiting records */
    const users: User[] = await this.find({ where: { team_search_status: UserTeamSearchStatus.ACTIVE, group: null } });
    return users;
  }

  async updateInformation(user_id: number, params: UpdateUserInformationDto): Promise<User | undefined> {
    const user: User = await this.findOne(user_id);
    if (!user) return undefined;
    const updatedUser = await this.save({ id: user_id, ...params });
    return updatedUser;
  }

  async updateSearchStatus(user_id: number, params: UpdateUserSearchStatusDto): Promise<User | undefined> {
    const user: User = await this.findOne(user_id);
    if (!user) return undefined;
    const updatedUser = await this.save({ id: user_id, ...params });
    return updatedUser;
  }
}
