import { ApiTags, ApiResponse, ApiHeader, ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Controller, Get, Param, UseGuards, Post, Req, Body, Put } from '@nestjs/common';
import { UserService } from './users.service';
import { AuthGuard } from '../../../../helpers/guards/auth.guard';
import { CreateGroupDto } from '../groups/dtos/group.dto';
import { EstablishResponse } from '../../entities/response_entities/group/establish.response';
import { GroupService } from '../groups/group.service';
import { UpdateUserInformationDto, UpdateUserSearchStatusDto } from './dtos/UpdateUserDto';
import { UserUpdateResponseEntity } from '../../entities/response_entities/user/update.response';

@ApiTags('User')
@ApiHeader({ name: 'token', required: true })
@ApiResponse({ status: 401, description: '유효하지 않은 세션' })
@ApiResponse({ status: 410, description: '만료된 세션' })
@Controller('user')
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

  @Put('info')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: '회원 기본정보 수정' })
  @ApiBody({ type: UpdateUserInformationDto })
  @ApiCreatedResponse({ description: '성공', type: UserUpdateResponseEntity })
  @ApiResponse({ status: 200, description: '수정 성공' })
  async updateUser(@Req() req: any, @Body() params: UpdateUserInformationDto) {
    const userId = req.authInfo.sub;
    const updatedUser = await this.service.updateUserInformation(userId, params);
    return { code: 200, message: '수정 성공', data: { user: updatedUser } };
  }

  @Put('search_info')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: '회원 구직정보 수정' })
  @ApiBody({ type: UpdateUserSearchStatusDto })
  @ApiCreatedResponse({ description: '성공', type: UserUpdateResponseEntity })
  @ApiResponse({ status: 200, description: '수정 성공' })
  async updateSearchInfo(@Req() req: any, @Body() params: UpdateUserSearchStatusDto) {
    const userId = req.authInfo.sub;
    const updatedUser = await this.service.updateUserSearchStatus(userId, params);
    return { code: 200, message: '수정 성공', data: { user: updatedUser } };
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
