import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '../base.response';
import { User } from '../../../../../entity/user.entity';

abstract class UserUpdateResponseData {
  @ApiProperty()
  user: User;
}

export abstract class UserUpdateResponseEntity extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty()
  data: UserUpdateResponseData;
}
