import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import compression from 'compression';
import { join } from 'path';
import { HttpExceptionFilter, UnknownExceptionFilter } from './filters';
import { ApiTransformInterceptor } from './interceptors';
import { setupSwagger } from './setup-swagger';
import { HttpStatus, Logger, UnprocessableEntityException, ValidationError, ValidationPipe } from '@nestjs/common';
import morgan from 'morgan';
import { appConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {rawBody: true});
  app.enableCors();
  app.use(compression());
  app.enableVersioning();
  // app.use(json({ limit: '10mb' }));
  // app.use(urlencoded({ extended: true, limit: '10mb' }));

  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.setGlobalPrefix(appConfig.prefixPath);
  setupSwagger(app, `${appConfig.prefixPath}/docs`);
  
  // const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ApiTransformInterceptor());
  app.useGlobalFilters(
    new UnknownExceptionFilter(),
    new HttpExceptionFilter(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      skipUndefinedProperties: false,
      skipMissingProperties: false,
      whitelist: false,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      dismissDefaultMessages: false,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new UnprocessableEntityException(
          validationErrors.map((error) => ({
            field: error.property,
            error: Object.values(error.constraints).join(', '),
          })),
        );
      },
    }),
  );

  app.use(morgan('combined'));
  await app.listen(appConfig.port, appConfig.host);
  Logger.log(
    `Application listening on port ${appConfig.host}:${appConfig.port}`,
    'bootstrap',
  );
}

bootstrap();