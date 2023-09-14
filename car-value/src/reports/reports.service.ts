import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-reports.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportsRepo: Repository<Report>,
  ) {}
  async create(reportData: CreateReportDto) {
    const report = this.reportsRepo.create(reportData);

    return await this.reportsRepo.save(report);
  }
}
