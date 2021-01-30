import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { EntityRepository } from 'typeorm';
import { ScoutHistory } from '../entity/scout_history.entity';
import { WicoGlobal } from '../libs/winteriscoming/global.wico';
import { User } from '../entity/user.entity';
import { Group } from '../entity/group.entity';
import * as moment from 'moment';

@EntityRepository(ScoutHistory)
export class ScoutHistoryHandler extends BaseRepository<ScoutHistory> {
  async makeHistory(params: any, user: User, group: Group): Promise<ScoutHistory> {
    const expiresAt = moment().add(WicoGlobal.getInstance().expiredAfter, 'days').toDate();
    const history = await this.save({ user: user, group: group, expire_scheduled_at: expiresAt, ...params });
    return history;
  }

  async active(group_id: number): Promise<ScoutHistory[]> {
    const histories = await this.find({ where: { group: group_id, cancelled: false, expired: false, accepted: false } });
    return histories;
  }
}
