import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { UpdateReportDto } from './dtos/update-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportsRepo: Repository<Report>,
  ) {}

  async create(reportData: CreateReportDto) {
    const report = this.reportsRepo.create(reportData);
    return await this.reportsRepo.save(report);
  }

  async getAll() {
    const reports = this.reportsRepo.find();
    return reports;
  }

  async findById(id: number) {
    const report = this.reportsRepo.findOneBy({ id });
    return report;
  }

  async update(id: number, reportData: UpdateReportDto) {
    const report = await this.findById(id);
    if (!report) throw new NotFoundException('Report not Found');

    Object.assign(report, reportData);
    return await this.reportsRepo.save(report);
  }

  async deleteById(id: number) {
    const report = await this.findById(id);
    if (!report) throw new NotFoundException('Report not Found');

    return await this.reportsRepo.remove(report);
  }
}
