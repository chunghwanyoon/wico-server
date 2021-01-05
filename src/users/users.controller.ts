import { ApiTags, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { Controller, Get, Req, Param, UseGuards, Query } from '@nestjs/common';
import { UserService } from './users.service';
import { AuthGuard } from '../helpers/guards/auth.guard';

@ApiTags('Users')
@ApiHeader({ name: 'token', required: true })
@ApiResponse({ status: 401, description: '유효하지 않은 세션' })
@ApiResponse({ status: 410, description: '만료된 세션' })
@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  public service = new UserService();

  @Get(':id')
  async findUserById(@Param('id') id: number) {
    const user = await this.service.getUserInfoById(id);
    return { data: user, message: 'success' };
  }
}
