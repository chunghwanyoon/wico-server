import { ApiCreatedResponse, ApiTags, ApiBody, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { Controller, Get, Post, Req, Param, Body, UseGuards } from '@nestjs/common';
import { GroupService } from './group.service';
import { EstablishResponse } from '../../entities/response_entities/group/establish.response';
import { CreateGroupDto } from './dtos/group.dto';
import { AuthGuard } from '../../../../helpers/guards/auth.guard';

@ApiTags('Groups')
@ApiHeader({ name: 'token', required: true })
@ApiResponse({ status: 401, description: '유효하지 않은 세션' })
@ApiResponse({ status: 410, description: '만료된 세션' })
@Controller('groups')
@UseGuards(AuthGuard)
export class GroupController {
  public service = new GroupService();
}
