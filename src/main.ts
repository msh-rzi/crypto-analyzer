import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Prefix
  const globalPrefix = 'core/v1';
  app.setGlobalPrefix(globalPrefix);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || [
      'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  });

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Crypto Asset API')
    .setDescription('API for managing cryptocurrency assets and related data')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Assets', 'Asset management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const swaggerPrefix = 'docs';

  SwaggerModule.setup(swaggerPrefix, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  const separator = '='.repeat(60);

  logger.fatal(separator);
  logger.log(`🌐 App URL:        http://localhost:${port}`);
  logger.log(`📚 Swagger Docs:   http://localhost:${port}/${swaggerPrefix}`);
  logger.fatal(separator);
}
bootstrap();
