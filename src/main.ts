import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilitar validación global con ValidationPipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  // Ignora campos no definidos en el DTO
    forbidNonWhitelisted: true,  // Lanza un error si hay campos no permitidos
    transform: true,  // Convierte los datos a los tipos esperados en el DTO
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
