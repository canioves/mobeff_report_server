import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Report } from './report.model';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.HOST,
      port: Number(process.env.PORT),
      username: process.env.DB_USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      autoLoadModels: true,
      models: [Report],
    }),
    SequelizeModule.forFeature([Report]),
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
