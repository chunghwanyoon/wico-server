import { JwtService } from '@nestjs/jwt';

export class Authenticator {
  private jwt = new JwtService({ secret: process.env.HASHING_KEY, signOptions: { expiresIn: '2h' } });

  async accessToken(payload: any): Promise<string> {
    return this.jwt.sign(payload);
  }

  async verify() {}
}
