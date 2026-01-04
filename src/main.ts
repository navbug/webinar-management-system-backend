import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove properties not in the DTO
      transform: true,
      forbidNonWhitelisted: true, // to reject unexpected properties
    }),
  );

  // Global exception filter - it catches all errors and converts them into proper JSON response format
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global response transformer - it transforms response for consistent response format
  app.useGlobalInterceptors(new TransformInterceptor());

  const port = process.env.PORT || 3000;

  await app.listen(port);

  console.log(`Application running on port: ${port}`);
}
bootstrap();
