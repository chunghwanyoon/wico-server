import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '../base.response';
import { User } from '../../../../../entity/user.entity';

abstract class SignUpResponseData {
  @ApiProperty()
  user: User;
}

export abstract class SignUpResponse extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty()
  data: SignUpResponseData;
}
