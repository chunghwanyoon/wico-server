import { ApiTags, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, Post, Request, Req, Param, Body } from '@nestjs/common';
import { PublicService } from './public.service';
import { UserListResponse } from '../../entities/response_entities/public/users.response';
import { GroupListResponse } from '../../entities/response_entities/public/groups.response';

@ApiTags('Public')
@ApiResponse({ status: 200, description: '성공' })
@Controller('public')
export class PublicController {
  constructor(private service: PublicService) {}

  @ApiCreatedResponse({ description: '성공', type: UserListResponse })
  @Get('users')
  async lookingTeamUsers() {
    const users = await this.service.userList();
    return { code: 200, message: '조회 성공', data: { users: users } };
  }

  @ApiCreatedResponse({ description: '성공', type: GroupListResponse })
  @Get('groups')
  async recruitingGroups() {
    const groups = await this.service.groupList();
    return { code: 200, message: '조회 성공', data: { groups: groups } };
  }
}
