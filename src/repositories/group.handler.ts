import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { EntityRepository, getCustomRepository } from 'typeorm';
import { Group, GroupStatus } from '../entity/group.entity';

@EntityRepository(Group)
export class GroupHandler extends BaseRepository<Group> {}
