import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Req, Param, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { AuthGuard } from '../helpers/guards/auth.guard';

@ApiTags('Users')
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
