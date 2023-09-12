import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cookieSession({
<<<<<<< HEAD
      keys: ['klsjdsiixzz'],
=======
      keys: ['lksadjfiufsoj'],
>>>>>>> 9a19908e27d436e674e5e863a6ed7348d8d5347c
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
