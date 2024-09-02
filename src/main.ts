import { NestFactory } from '@nestjs/core';
import { ReportModule } from './report.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(ReportModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.REPORT_SERVER_PORT);
}
bootstrap();
