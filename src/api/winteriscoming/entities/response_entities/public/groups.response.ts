import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '../base.response';
import { Group } from '../../../../../entity/group.entity';

abstract class GroupListResponseData {
  @ApiProperty({ isArray: true, type: () => Group })
  groups: Group[];
}

export abstract class GroupListResponse extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty()
  data: GroupListResponseData;
}
