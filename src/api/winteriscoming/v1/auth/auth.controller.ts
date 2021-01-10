import { ApiTags, ApiBody, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, Post, Request, Req, Param, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dtos/login.dto';
import { SignUpDto } from './dtos/signup.dto';
import { User } from '../../../../entity/user.entity';
import { LoginResponse } from '../../entities/response_entities/auth/login.response';
import { SignUpResponse } from '../../entities/response_entities/auth/signup.response';

@ApiTags('Auth')
@ApiResponse({ status: 200, description: '성공' })
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({ description: '성공', type: LoginResponse })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() params: LoginDto) {
    const result = await this.service.validateUser(params.email, params.password);
    const { password, auth_secret, ...userInfo } = result.user;
    return { code: 201, message: '안전하게 로그인 되었습니다', data: { ...result, user: userInfo } };
  }

  @ApiBody({ type: SignUpDto })
  @ApiCreatedResponse({ description: '성공', type: SignUpResponse })
  @Post('signup')
  async signUp(@Body() params: SignUpDto) {
    const user: User = await this.service.signup(params);
    const { password, auth_secret, ...userInfo } = user;
    return { code: 201, message: '정상적으로 회원가입 되었습니다.', data: { user: userInfo } };
  }
}