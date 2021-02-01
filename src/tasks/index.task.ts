import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { WicoTask } from './wico.task';

@Module({
  imports: [CommandModule],
  exports: [],
  providers: [
    /* inject tasks */
    WicoTask,
  ],
})
export class TaskModule {}
