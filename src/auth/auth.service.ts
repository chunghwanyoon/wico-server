import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { User, UserType, UserStatus } from '../entity/user.entity';

@Injectable()
export class AuthService {
  constructor(private users: UserService) {}

  async validateUser(email: string, input_password: string): Promise<any> {
    const user: User = await this.users.getUserByEmail(email);
    if (user && user.password === input_password) {
      const { password, ...userInfo } = user;
      return userInfo;
    }
    return null;
  }
}
