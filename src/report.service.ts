import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Report } from './report.model';
import axios from 'axios';
import * as Excel from 'exceljs';

@Injectable()
export class ReportService {
  constructor(@InjectModel(Report) private reportRepository: typeof Report) {}

  async createReport(serviceName: string, endpoint: string, headers: string[]) {
    const savedReport = await this.reportRepository.create({
      status: 'in progress',
      serviceName,
      endpoint,
      headers,
    });
    await this.generateReport(savedReport.id);
    return savedReport.id;
  }

  private async generateReport(id: number) {
    const report = await this.reportRepository.findByPk(id);

    const response = await axios.get(
      `${report.serviceName}/${report.endpoint}`,
    );
    const data = response.data.pageOfProducts;
    console.log(data);
    const wb = new Excel.Workbook();
    const sheet = wb.addWorksheet('Report');
    sheet.addRow(report.headers);
    data.forEach((item: object) => {
      sheet.addRow(Object.values(item));
    });

    const file = `reports/report${id}.xlsx`;
    await wb.xlsx.writeFile(file);
    report.status = 'done';
    report.fileUrl = file;
    await report.save();
  }
}
