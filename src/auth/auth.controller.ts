import { ApiTags, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { Controller, Get, Post, Request, Req, Param, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/LoginDto';
import { SignUpDto } from './dto/SignUpDto';
import { User } from '../entity/user.entity';
import { LoginResponse } from '../api/responses/auth/LoginResponse';
import { SignUpResponse } from '../api/responses/auth/SignUpResponse';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({ description: '성공', type: LoginResponse })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() params: LoginDto): Promise<LoginResponse> {
    return;
  }

  @ApiBody({ type: SignUpDto })
  @ApiCreatedResponse({ description: '성공', type: SignUpResponse })
  @Post('signup')
  async signUp(@Request() params: SignUpDto) {
    return;
  }
}
