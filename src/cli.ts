import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';
import { createConnection } from 'typeorm';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';

async () => {
  createConnection('default').then(async (connection) => {
    /* init cls-hooked */
    initializeTransactionalContext();

    const app = await NestFactory.createApplicationContext(AppModule, {
      logger: true,
    });
    app.select(CommandModule).get(CommandService).exec();
  });
};
