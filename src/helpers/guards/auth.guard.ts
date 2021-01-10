import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { WicoException } from '../../exceptions/wico.exception';
import { BaseAuthModule } from '../../api/winteriscoming/v1/auth/modules/auth.base';

@Injectable()
export class AuthGuard implements CanActivate {
  private auth = new BaseAuthModule();
  private PRODUCTION = process.env.NODE_ENV === 'production' ? true : false;

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    /* 개발환경에서는 무조건 패스 */
    if (!this.PRODUCTION) return true;
    const request = context.switchToHttp().getRequest();
    const token = request.headers.token || request.query.token;
    if (!token) throw new WicoException('유효하지 않은 세션', 401);
    request.current_user = this.auth.tokenVerify(token);
    return true;
  }
}
