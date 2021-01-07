import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { User, UserType, UserStatus } from '../../../../entity/user.entity';
import { BaseAuthModule } from '../../../../libs/auth/BaseAuthModule';
import { SignUpDto } from './dtos/SignUpDto';
import { LoginResponseData } from '../../entities/response_entities/auth/LoginResponse';

@Injectable()
export class AuthService {
  constructor(private users: UserService, private auth: BaseAuthModule) {}

  async validateUser(email: string, input_password: string): Promise<LoginResponseData> {
    const user: User = await this.users.getUserForLogin(email);
    const rehash = await this.auth.rehash(input_password, user.auth_secret);
    if (user && rehash === user.password) {
      const token: string = await this.auth.token({ username: user.name, sub: user.id });
      return { user: user, token: token };
    }
    return undefined;
  }

  async signup(params: SignUpDto): Promise<User> {
    const { password, ...userInfo } = params;
    const { hashed, initVector } = await this.auth.hash(password);
    const user: User = await this.users.signUp({ ...userInfo, password: hashed }, initVector);
    return user;
  }
}
