import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { WicoException } from '../../exceptions/wico.exception';
import { BaseAuthModule } from '../../libs/auth/BaseAuthModule';

@Injectable()
export class AuthGuard implements CanActivate {
  private auth = new BaseAuthModule();

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.token || request.query.token;
    if (!token) throw new WicoException('유효하지 않은 세션', 401);
    request.current_auth = this.auth.tokenVerify(token);
    return true;
  }
}
