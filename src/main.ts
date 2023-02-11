import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const start = async () => {
  const PORT = +process.env.PORT || 5000;

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Nestjs api example')
    .setDescription('REST API documentation')
    .setVersion('1.0')
    .addTag('christmas turkey')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
};

start();
