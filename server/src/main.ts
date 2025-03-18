import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
// import { corsOptions } from './common/configs/cors.config';
// import * as csurf from 'csurf';
import helmet from 'helmet';
import { DecimalInterceptor } from './decimal/decimal.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // protect app from some well-known web vulnerabilities by setting HTTP headers appropriately
  app.use(helmet());
  // mitigate unauthorized commands are transmitted from a user that the web application trusts global middleware.
  // app.use(csurf());
  // enable CORS, allows resources to be requested from another domain
  // app.enableCors({
  //   origin: true,
  //   // corsOptions // this is the correct cors config
  // });
  // Allow requests from all domains
  app.enableCors({
    origin: '*', // Wildcard allows all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Common headers
    credentials: false, // Set to true if you need cookies/auth with cross-origin
  });

  // Apply global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that do not have any decorators
      // forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
      transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
      errorHttpStatusCode: 422, // Optional: Use Unprocessable Entity instead of Bad Request
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalInterceptors(new DecimalInterceptor()); // Register the interceptor globally
  app.useGlobalPipes(new ValidationPipe()); // Optionally, if you're using validation

  // Set global prefix
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('APIs Documentation')
    .setDescription('The APIs description for UAT')
    .setVersion('1.0')
    .addTag('api')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apis', app, documentFactory);

  // node web server
  await app.listen(process.env.PORT || 5000);

  // Log the full URL
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
