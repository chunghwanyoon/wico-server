import { createCipheriv, createDecipheriv, randomBytes, createHash } from 'crypto';

export class Crypto {
  private ALGORITHM = 'aes-256-ctr';
  private HASHING_KEY = process.env.HASHING_KEY;

  async key_in_bytes(): Promise<any> {
    return createHash('sha256').update(String(this.HASHING_KEY)).digest('base64').substr(0, 32);
  }

  async cipher(): Promise<any> {
    const key = await this.key_in_bytes();
    const iv = randomBytes(16).toString('hex').slice(0, 16);
    const cipher = createCipheriv(this.ALGORITHM, key, iv);
    return { cipher, key, iv };
  }

  async decipher(): Promise<any> {
    const key = await this.key_in_bytes();
    const iv = randomBytes(16).toString('hex').slice(0, 16);
    return createDecipheriv(this.ALGORITHM, key, iv);
  }

  async encrypt(payload: any): Promise<any> {
    const { cipher, key, iv } = await this.cipher();
    const result = cipher.update(String(payload), 'utf8', 'hex') + cipher.final('hex');
    return { result, key, iv };
  }

  async decrypt(payload: any): Promise<any> {
    const decipher = await this.decipher();
    const result = decipher.update(payload, 'hex', 'utf8') + decipher.final('utf8');
    return result;
  }

  async verify(payload: string, key: string, iv: string): Promise<any> {
    const cipher = createCipheriv(this.ALGORITHM, key, iv);
    const result = cipher.update(String(payload), 'utf8', 'hex') + cipher.final('hex');
    return result;
  }
}
