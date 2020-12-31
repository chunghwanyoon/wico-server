import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../entity/user.entity';
import { BaseResponse } from '../BaseResponse';

export abstract class LoginResponseData {
  @ApiProperty()
  user: User;
  @ApiProperty()
  token: string;
}

export abstract class LoginResponse extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty()
  data: LoginResponseData;
}
