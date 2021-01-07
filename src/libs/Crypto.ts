import { createCipheriv, createDecipheriv, randomBytes, createHash } from 'crypto';

export class Crypto {
  private ALGORITHM = 'aes-256-ctr';
  private HASHING_KEY = process.env.HASHING_KEY;

  async AUTH_KEY(): Promise<string> {
    return createHash('sha256').update(String(this.HASHING_KEY)).digest('base64').substr(0, 32);
  }

  async cipher(initVector: string = randomBytes(16).toString('hex').slice(0, 16)) {
    const key = await this.AUTH_KEY();
    const cipher = createCipheriv(this.ALGORITHM, key, initVector);
    return { cipher, initVector };
  }

  async decipher(initVector: string) {
    const key = await this.AUTH_KEY();
    const decipher = createDecipheriv(this.ALGORITHM, key, initVector);
    return { decipher, initVector };
  }

  async encrypt(payload: any) {
    const { cipher, initVector } = await this.cipher();
    const hashed = cipher.update(String(payload), 'utf8', 'hex') + cipher.final('hex');
    return { hashed, initVector };
  }

  async decrypt(payload: any) {}

  async verify(payload: string, iv: string): Promise<any> {
    const { cipher, ...rest } = await this.cipher(iv);
    const rehash = cipher.update(String(payload), 'utf8', 'hex') + cipher.final('hex');
    return rehash;
  }
}
