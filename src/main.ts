import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // Transform the request body to corresponding DTO, with correct types
      transform: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Calendar API')
    .setDescription('Calendar API Documentation')
    .setVersion('1.0')
    .addTag('docs')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.getNumber('PORT'));
}
bootstrap();
