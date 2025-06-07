import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Security middleware
  app.use(helmet());


  // CORS configuration
  app.enableCors({
    origin: configService.get('CORS_ORIGIN')?.split(',') || ['http://localhost:3000'],
    credentials: true,
  });

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

  // API prefix
  app.setGlobalPrefix('api');

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle(configService.get('SWAGGER_TITLE') || 'WebBuilder API')
    .setDescription(configService.get('SWAGGER_DESCRIPTION') || 'WebBuilder API with multi-tenancy and OAuth2')
    .setVersion(configService.get('SWAGGER_VERSION') || '1.0.0')
    .addBearerAuth()
    .addTag('Authentication', 'OAuth2 and JWT authentication endpoints')
    .addTag('Users', 'User management endpoints')
    .addTag('Permissions', 'Permission management endpoints')
    .addTag('Applications', 'Application configuration endpoints')
    .addTag('Pages', 'Page configuration endpoints')
    .addTag('Views', 'View configuration endpoints')
    .addTag('Tenants', 'Multi-tenancy management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(configService.get('SWAGGER_PATH') || 'api/docs', app, document);

  const port = configService.get('PORT') || 3001;
  await app.listen(port);
  
  console.log(`🚀 WebBuilder API is running on: http://localhost:${port}`);
  console.log(`📚 Swagger documentation: http://localhost:${port}/${configService.get('SWAGGER_PATH') || 'api/docs'}`);
}

bootstrap();
