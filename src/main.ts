import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(cookieParser());

  app.enableCors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // process.env.FRONTEND_URL
    credentials: true,
  });

  await app.listen(process.env.SERVER_PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
