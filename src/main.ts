import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

const ENV = process.env['NODE_ENV'];
const APP = process.env['APP'];
const PORT = process.env['PORT'] || 3000;
const VERSION = process.env['VERSION'];
const BODYPARSER_LIMIT = process.env['BODYPARSER_LIMIT'];
const API_PATH = process.env['API_PATH'];

const logger = new Logger(`App: ${APP} * Environment: ${ENV}`);

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
      .setTitle(APP)
      .setDescription(`Environment: ${ENV}`)
      .setVersion(VERSION)
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(API_PATH, app, document, {
      swaggerOptions: {
        filter: true,
        docExpansion: 'none',
        displayRequestDuration: true,
        persistAuthorization: true,
      },
      customSiteTitle: APP,
    });

    app.enableCors({
      credentials: true,
    });
    app.use(bodyParser.json({ limit: BODYPARSER_LIMIT }));
    app.use(bodyParser.urlencoded({ limit: BODYPARSER_LIMIT, extended: true }));
    await app.listen(PORT);
    const url = await app.getUrl();
    logger.verbose(`Server run on: ${url}`);
    logger.verbose(`Api documentation run on: ${url}/${API_PATH}`);
  } catch (error) {
    logger.error(error.message);
  }
}
bootstrap();
