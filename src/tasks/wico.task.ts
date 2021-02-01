import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WicoTask {
  @Command({ command: 'temp:test', describe: 'Testing temp scripts', autoExit: true })
  test() {
    console.log('Hello World!');
    return;
  }
}
