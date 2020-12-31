import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { User, UserType, UserStatus } from '../entity/user.entity';
import { BaseAuthModule } from '../libs/auth/BaseAuthModule';

@Injectable()
export class AuthService {
  constructor(private users: UserService, private auth: BaseAuthModule) {}

  async validateUser(email: string, input_password: string): Promise<Partial<User> | undefined> {
    const user: User = await this.users.getUserForLogin(email);
    const hash = await this.auth.hash(input_password);
    if (user && hash === input_password) {
      const { password, ...userInfo } = user;
      return userInfo;
    }
    return undefined;
  }
}
