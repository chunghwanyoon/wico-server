import { ApiCreatedResponse, ApiTags, ApiBody, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { Controller, Get, Post, Req, Param, Body, UseGuards } from '@nestjs/common';
import { GroupService } from './group.service';
import { EstablishResponse } from '../../entities/response_entities/group/EstablishResponse';
import { CreateGroupDto } from './dtos/CreateGroupDto';
import { AuthGuard } from '../../../../helpers/guards/auth.guard';

@ApiTags('Groups')
@ApiHeader({ name: 'token', required: true })
@ApiResponse({ status: 200, description: '성공' })
@ApiResponse({ status: 401, description: '유효하지 않은 세션' })
@ApiResponse({ status: 410, description: '만료된 세션' })
@Controller('groups')
@UseGuards(AuthGuard)
export class GroupController {
  public service = new GroupService();

  /* request to group */

  /* create group from user */
  @ApiBody({ type: CreateGroupDto })
  @ApiCreatedResponse({ description: '성공', type: EstablishResponse })
  @Post()
  async establish(@Body() params: CreateGroupDto) {
    const group = await this.service.createGroup(params);
    return group;
  }
}
