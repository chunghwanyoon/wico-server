import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

export class Crypto {
  private ALGORITHM = 'aes-256-ctr';
  private HASHING_KEY = process.env.HASHING_KEY;

  cipher(): any {
    const iv = randomBytes(16);
    return createCipheriv(this.ALGORITHM, this.HASHING_KEY, iv);
  }

  decipher(): any {
    const iv = randomBytes(16);
    return createDecipheriv(this.ALGORITHM, this.HASHING_KEY, iv);
  }

  async encrypt(payload: any): Promise<Buffer> {
    const result = Buffer.concat([
      this.cipher().update(payload),
      this.cipher().final(),
    ]);
    return result;
  }

  async decrypt(payload: Buffer): Promise<any> {
    const result = Buffer.concat([
      this.decipher().update(payload),
      this.decipher().final(),
    ])
    return result;
  }
}
