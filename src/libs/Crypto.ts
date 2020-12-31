import * as crypto from 'crypto';
import 'dotenv/config';

export class Crypto {
  private HASHING_KEY = process.env.HASHING_KEY;
  private ALGORITHM = 'sha1';

  public async encrypt(string: string): Promise<string> {
    return crypto.createHmac(this.ALGORITHM, this.HASHING_KEY).update(string).digest('base64');
  }

  public async decrypt(string: string): Promise<void> {}
}
