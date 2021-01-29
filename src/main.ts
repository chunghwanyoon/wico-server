import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { BaseAPISpecifications } from './api/winteriscoming/base.specifications';
import 'dotenv/config';

async function bootstrap() {
  const env = process.env.NODE_ENV === 'production' ? true : false;

  createConnection('default')
    .then(async (connection) => {
      /* init cls-hooked */
      initializeTransactionalContext();

      /* app bootstrap */
      const app = await NestFactory.create(AppModule);
      app.enableCors({ origin: true });
      app.setGlobalPrefix('/api/v1');

      /* mount Swagger API Documentation */
      const documentOptions = new BaseAPISpecifications().initializeOptions();
      const document = SwaggerModule.createDocument(app, documentOptions);
      SwaggerModule.setup('api/v1/docs', app, document, {
        swaggerOptions: { defaultModelsExpandDepth: -1 },
      });

      /* global pipeline for API request validations */
      app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: env, transform: true }));

      await app.listen(process.env.APP_PORT);
    })
    .catch((err) => {
      console.log(err);
    });
}
bootstrap();
