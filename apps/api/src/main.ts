import cookieParser from "cookie-parser";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('University Coding LMS API')
    .setDescription('The core API for the LMS platform')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.use(cookieParser());
  app.setGlobalPrefix("api");
  app.enableCors({ origin: "http://localhost:3000", credentials: true });
  await app.listen(3001);
}
bootstrap();
