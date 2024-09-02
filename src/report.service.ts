import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Report } from './report.model';
import axios from 'axios';
import * as Excel from 'exceljs';
import { CreateReportDto } from './dto/createReport.dto';

@Injectable()
export class ReportService {
  constructor(@InjectModel(Report) private reportRepository: typeof Report) {}

  async createReport(dto: CreateReportDto) {
    const savedReport = await this.reportRepository.create({
      status: 'in progress',
      serviceName: dto.serviceName,
      endpoint: dto.endpoint,
      headers: dto.headers,
    });

    // generate report after 10 seconds
    setTimeout(async () => {
      await this.generateReport(savedReport.id, dto.limit, dto.page);
    }, 10000);

    return { reportId: savedReport.id };
  }

  private async generateReport(id: number, limit: number, page: number) {
    const report = await this.reportRepository.findByPk(id);

    let url = `${report.serviceName}/${report.endpoint}`;
    if (limit && page) {
      url += `?limit=${limit}&page=${page}`;
    } else if (limit) {
      url += `?limit=${limit}`;
    } else if (page) {
      url += `?page=${page}`;
    }

    const response = await axios.get(url);
    const data = response.data.pageOfProducts;

    const wb = new Excel.Workbook();
    const sheet = wb.addWorksheet('Report');

    sheet.addRow(report.headers);
    data.forEach((item: object) => {
      sheet.addRow(Object.values(item));
    });

    const file = `reports\\report${id}.xlsx`;
    await wb.xlsx.writeFile(file);

    report.status = 'done';
    report.fileUrl = __dirname.replace('\\dist', '') + '\\' + file;

    await report.save();
  }

  async getReportStatus(id: number) {
    try {
      const report = await this.reportRepository.findByPk(id);
      return {
        id: report.id,
        status: report.status,
        fileUrl: report.status === 'done' ? report.fileUrl : null,
      };
    } catch (error) {
      throw new BadRequestException({
        message: 'Report not found',
      });
    }
  }
}
