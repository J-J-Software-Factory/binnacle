import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppConfig } from '@nx-admin-starter/api/config';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // validations
  app.useGlobalPipes(new ValidationPipe());

  // Config declarations
  const configService = app.get(ConfigService);
  const config = configService.get<AppConfig>('app');

  // cors
  if (config.cors.enabled) {
    app.enableCors({ origin: '*' });
  }

  await app.listen(config.port, () => {
    Logger.log(`Listening at http://localhost:${config.port}`);
  });
}

bootstrap();
