import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/createReport.dto';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('/create')
  async createReport(
    @Body()
    dto: CreateReportDto,
  ) {
    return await this.reportService.createReport(dto);
  }

  @Get('/:id')
  async getReportStatus(@Param('id') id: number) {
    return await this.reportService.getReportStatus(id);
  }
}
