import { HttpException } from '@nestjs/common';

export class WicoException extends HttpException {
  constructor(message: string, code: number) {
    super(message, code);
  }
}
