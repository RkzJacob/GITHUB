import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';




async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  // Configuración de CORS
  app.enableCors({
    origin: [
      'https://alabama-daughters-slot-involve.trycloudflare.com',
      'http://localhost:3001',
      
    ], // Permite el acceso desde este origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  
  // configuracion de la api
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('NEST API REST')
    .setDescription('The REST API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
