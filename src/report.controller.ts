import { Body, Controller, Post } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('/create')
  async createReport(
    @Body()
    body: {
      serviceName: string;
      endpoint: string;
      headers: string[];
      limit: number | null;
      page: number | null;
    },
  ) {
    console.log(body);
    return await this.reportService.createReport(
      body.serviceName,
      body.endpoint,
      body.headers,
      body.limit,
      body.page,
    );
  }
}
