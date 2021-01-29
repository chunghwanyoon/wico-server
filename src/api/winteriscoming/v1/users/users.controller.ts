import { ApiTags, ApiResponse, ApiHeader, ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Controller, Get, Param, UseGuards, Post, Req, Body } from '@nestjs/common';
import { UserService } from './users.service';
import { AuthGuard } from '../../../../helpers/guards/auth.guard';
import { CreateGroupDto } from '../groups/dtos/group.dto';
import { EstablishResponse } from '../../entities/response_entities/group/establish.response';
import { GroupService } from '../groups/group.service';

@ApiTags('Users')
@ApiHeader({ name: 'token', required: true })
@ApiResponse({ status: 401, description: '유효하지 않은 세션' })
@ApiResponse({ status: 410, description: '만료된 세션' })
@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  public service = new UserService();
  public groups = new GroupService();

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: '내정보 조회' })
  @ApiResponse({ status: 200, description: '조회 성공' })
  async findUserById(@Req() req: any) {
    const userId = req.authInfo.sub;
    const user = await this.service.getUserInfoById(userId);
    return { data: user, message: 'success' };
  }

  @ApiBody({ type: CreateGroupDto })
  @ApiCreatedResponse({ description: '성공', type: EstablishResponse })
  @ApiOperation({ summary: '그룹 만들기' })
  @Post('establish')
  async createGroup(@Body() params: CreateGroupDto, @Req() req: any) {
    const userId = req.authInfo.sub;
    const group = await this.groups.createGroup(userId, params);
    return { code: 201, message: '그룹이 생성되었습니다.', data: { group: group } };
  }
}
