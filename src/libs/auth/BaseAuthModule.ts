import { Crypto } from '../Crypto';

export class BaseAuthModule extends Crypto {
  async hash(raw_password: string): Promise<any> {
    return this.encrypt(raw_password);
  }
}
