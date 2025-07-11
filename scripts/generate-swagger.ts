import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

async function generateSwaggerJson() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Crypto Asset API')
    .setDescription('API for managing cryptocurrency assets and related data')
    .setVersion('1.0')
    .addBearerAuth()
    .setExternalDoc('Postman Collection', '/docs-json')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const outputPath = resolve(__dirname, '../swagger.json');
  writeFileSync(outputPath, JSON.stringify(document, null, 2));
  console.log(`✅ Swagger JSON written to ${outputPath}`);

  await app.close();
}

generateSwaggerJson();
