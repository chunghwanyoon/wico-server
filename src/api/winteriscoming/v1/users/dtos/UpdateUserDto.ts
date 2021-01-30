import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsPhoneNumber, IsOptional, IsNumber } from 'class-validator';
import { UserTeamSearchStatus } from '../../../../../entity/user.entity';

export class UpdateUserInformationDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  public name: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  public nickname: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsPhoneNumber('KR', { message: '휴대폰번호에 -는 제외하고 입력해주세요.' })
  public phone_number: string;
}

export class UpdateUserSearchStatusDto {
  @ApiProperty()
  @IsNumber()
  public team_search_status: UserTeamSearchStatus;
}
