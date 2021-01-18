import { Transactional } from 'typeorm-transactional-cls-hooked';
import { Injectable } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';
import { User } from '../../../../entity/user.entity';
import { Group } from '../../../../entity/group.entity';
import { UserHandler } from '../../../../repositories/user.handler';
import { GroupHandler } from '../../../../repositories/group.handler';

@Injectable()
export class PublicService {
  public groups = getCustomRepository(GroupHandler);
  public users = getCustomRepository(UserHandler);

  async groupList(): Promise<Group[]> {
    const groups: Group[] = await this.groups.findRecruitingGroups();
    return groups;
  }

  async userList(): Promise<User[]> {
    const users: User[] = await this.users.findTeamJoinActiveUsers();
    return users;
  }
}
