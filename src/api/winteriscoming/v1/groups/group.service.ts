import { Transactional } from 'typeorm-transactional-cls-hooked';
import { Injectable, Scope } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';
import { Group, GroupStatus } from '../../../../entity/group.entity';
import { CreateGroupDto } from './dtos/CreateGroupDto';
import { GroupHandler } from '../../../../repositories/group.handler';
import { WicoException } from '../../../../exceptions/wico.exception';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class GroupService {
  public groups = getCustomRepository(GroupHandler);

  async createGroup(params: CreateGroupDto): Promise<Group> {
    return;
  }
}
