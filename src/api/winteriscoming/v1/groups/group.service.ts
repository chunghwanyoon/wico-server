import { Transactional } from 'typeorm-transactional-cls-hooked';
import { Injectable } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';
import { Group, GroupStatus, RecruitStatus } from '../../../../entity/group.entity';
import { CreateGroupDto } from './dtos/group.dto';
import { GroupHandler } from '../../../../repositories/group.handler';
import { User, UserStatus } from '../../../../entity/user.entity';
import { UserHandler } from '../../../../repositories/user.handler';
import { WicoException } from '../../../../exceptions/wico.exception';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class GroupService {
  public groups = getCustomRepository(GroupHandler);
  public users = getCustomRepository(UserHandler);

  @Transactional()
  async createGroup(user_id: number, params: CreateGroupDto): Promise<Group> {
    const user: User = await this.users.findOne(user_id);
    if (!user) throw new WicoException('해당 회원은 존재하지 않습니다.', HttpStatus.NOT_FOUND);
    if (user.group) throw new WicoException('한개의 그룹에만 속할 수 있습니다.', HttpStatus.CONFLICT);

    const group: Group = await this.groups.buildGroup(params);
    user.group = group;
    await this.users.save(user);
    return group;
  }
}
