import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { EntityRepository, getCustomRepository } from 'typeorm';
import { HttpStatus } from '@nestjs/common';
import { Group, GroupStatus } from '../entity/group.entity';
import { User } from '../entity/user.entity';
import { CreateGroupDto } from '../api/winteriscoming/v1/groups/dtos/group.dto';
import { WicoException } from '../exceptions/wico.exception';

@EntityRepository(Group)
export class GroupHandler extends BaseRepository<Group> {
  async buildGroup(params: CreateGroupDto): Promise<Group> {
    const group: Group = await this.save(params);
    return group;
  }

  async activeGroups(): Promise<Group[]> {
    const groups: Group[] = await this.find({ where: { completed: false, released: false, closed: false } });
    return groups;
  }

  async releasingGroups(): Promise<Group[]> {
    const groups: Group[] = await this.find({ where: { completed: false, released: true, closed: false } });
    return groups;
  }

  async findMaster(group: Group): Promise<User> {
    const team = await this.findOne(group);
    return team.members[0];
  }
}
