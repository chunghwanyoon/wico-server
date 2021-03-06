import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '../base.response';
import { Group } from '../../../../../entity/group.entity';

abstract class EstablishResponseData {
  @ApiProperty()
  group: Group;
}

export abstract class EstablishResponse extends BaseResponse {
  constructor() {
    super();
  }

  @ApiProperty()
  data: EstablishResponseData;
}
