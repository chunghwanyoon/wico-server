import { Crypto } from '../Crypto';
import { Authenticator } from '../Authenticator';

export class BaseAuthModule {
  private crypto = new Crypto();
  private authenticator = new Authenticator();

  async hash(raw_password: string): Promise<any> {
    const { result, iv } = await this.crypto.encrypt(raw_password);
    return { result, iv };
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
}
