import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { BaseAPISpecifications } from './api/Base';
import 'dotenv/config';

async function bootstrap() {
  const env = process.env.NODE_ENV === 'production' ? true : false;

  createConnection('default')
    .then(async (connection) => {
      /* init cls-hooked */
      initializeTransactionalContext();

      /* app bootstrap */
      const app = await NestFactory.create(AppModule);
      app.setGlobalPrefix('/api');

      /* mount Swagger API Documentation */
      const documentOptions = new BaseAPISpecifications().initializeOptions();
      const document = SwaggerModule.createDocument(app, documentOptions);
      SwaggerModule.setup('api/docs', app, document);

      /* global pipeline for API request validations */
      app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: env, transform: true }));

      await app.listen(process.env.APP_PORT);
    })
    .catch((err) => {
      console.log(err);
    });
}
bootstrap();
