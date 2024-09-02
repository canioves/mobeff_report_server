import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Report } from './report.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '0000',
      database: 'report_db',
      autoLoadModels: true,
      models: [Report],
    }),
    SequelizeModule.forFeature([Report]),
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
