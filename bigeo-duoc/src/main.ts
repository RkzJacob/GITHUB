import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Sequelize } from 'sequelize-typescript';
import sequelize from 'sequelize';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // configuracion de la api
  const config = new DocumentBuilder()
    .setTitle('NEST API REST')
    .setDescription('The REST API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
