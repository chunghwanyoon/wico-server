import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '../base.response';
import { User } from '../../../../../entity/user.entity';

abstract class UserListResponseData {
  @ApiProperty({ isArray: true, type: () => User })
  users: User[];
}

export abstract class UserListResponse extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty()
  data: UserListResponseData;
}
