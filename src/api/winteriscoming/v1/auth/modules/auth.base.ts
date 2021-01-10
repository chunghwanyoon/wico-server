import { Crypto } from '../../../../../libs/crypto';
import { Authenticator } from '../../../../../libs/authenticator';

export class BaseAuthModule {
  private crypto = new Crypto();
  private authenticator = new Authenticator();

  async hash(raw_password: string): Promise<any> {
    const { hashed, initVector } = await this.crypto.encrypt(raw_password);
    return { hashed, initVector };
  }

  async rehash(password: string, iv: string): Promise<any> {
    return this.crypto.verify(password, iv);
  }

  async unhash(hashed_password: string): Promise<any> {
    return this.crypto.decrypt(hashed_password);
  }

  async token(payload: any): Promise<string> {
    return this.authenticator.accessToken(payload);
  }

  async tokenVerify(token: string): Promise<any> {
    return this.authenticator.verify(token);
  }
}
