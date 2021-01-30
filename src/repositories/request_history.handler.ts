import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { EntityRepository } from 'typeorm';
import { RequestHistory } from '../entity/request_history.entity';
import { WicoGlobal } from '../libs/winteriscoming/global.wico';
import { User } from '../entity/user.entity';
import { Group } from '../entity/group.entity';
import * as moment from 'moment';

@EntityRepository(RequestHistory)
export class RequestHistoryHandler extends BaseRepository<RequestHistory> {
  async makeHistory(params: any, user: User, group: Group) {
    const expiresAt = moment().add(WicoGlobal.getInstance().expiredAfter, 'days').toDate();
    const history = await this.save({ user: user, group: group, expire_scheduled_at: expiresAt, ...params });
    return history;
  }

  async active(user_id: number): Promise<RequestHistory[]> {
    const histories = await this.find({ where: { user: user_id, cancelled: false, expired: false, accepted: false } });
    return histories;
  }
}
