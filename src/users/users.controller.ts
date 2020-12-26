import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Req, Param } from '@nestjs/common';
import { UserService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  public service = new UserService();

  @Get(':id')
  async findUserById(@Param('id') id: number) {
    const user = await this.service.getUserInfoById(id);
    return { data: user, message: 'success' };
  }
}
