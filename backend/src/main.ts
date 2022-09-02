import { NestFactory } from '@nestjs/core';
import { CoreModule } from '@/modules/core/core.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(CoreModule);
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  await app.listen(3000, () => console.log('listening on 127:0.0.1:3000'));
}

bootstrap();
