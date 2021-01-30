import { Transactional } from 'typeorm-transactional-cls-hooked';
import { Injectable, Scope } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';
import { User, UserStatus, UserType } from '../../../../entity/user.entity';
import { UserHandler } from '../../../../repositories/user.handler';
import { SignUpDto } from '../auth/dtos/signup.dto';
import { WicoException } from '../../../../exceptions/wico.exception';
import { HttpStatus } from '@nestjs/common';
import { UpdateUserInformationDto, UpdateUserSearchStatusDto } from './dtos/UpdateUserDto';

@Injectable()
export class UserService {
  public users = getCustomRepository(UserHandler);

  async getUserInfoById(user_id: number): Promise<User> {
    const user: User | undefined = await this.users.findUserById(user_id);
    if (!user) throw new WicoException('해당 아이디의 회원은 존재하지 않아요.', HttpStatus.NOT_FOUND);
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user: User = await this.users.findUserByEmail(email);
    if (!user) throw new WicoException('해당 이메일을 가진 유저가 존재하지 않습니다.', HttpStatus.NOT_FOUND);
    return user;
  }

  async getUserForLogin(email: string): Promise<User> {
    const user: User = await this.users.findUserByEmail(email);
    if (!user) throw new WicoException('인증정보를 다시 확인해주시요', HttpStatus.UNAUTHORIZED);
    return user;
  }

  async updateUserInformation(user_id: number, params: UpdateUserInformationDto): Promise<User> {
    const updatedUser = await this.users.updateInformation(user_id, params);
    if (!updatedUser) throw new WicoException('해당 회원이 존재하지 않습니다.', HttpStatus.NOT_FOUND);
    return updatedUser;
  }

  async updateUserSearchStatus(user_id: number, params: UpdateUserSearchStatusDto): Promise<User> {
    const updatedUser = await this.users.updateSearchStatus(user_id, params);
    if (!updatedUser) throw new WicoException('해당 회원이 존재하지 않습니다.', HttpStatus.NOT_FOUND);
    return updatedUser;
  }

  @Transactional()
  async signUp(params: SignUpDto, auth_secret: string): Promise<User> {
    const user: User = await this.users.buildUser(params, auth_secret);
    return user;
  }
}
