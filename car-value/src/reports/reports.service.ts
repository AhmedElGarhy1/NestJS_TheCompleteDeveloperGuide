import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { UpdateReportDto } from './dtos/update-report.dto';
import { User } from 'src/users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportsRepo: Repository<Report>,
  ) {}

  async create(reportData: CreateReportDto, user: User) {
    const report = this.reportsRepo.create(reportData);
    report.user = user;

    return await this.reportsRepo.save(report);
  }

  async getAll() {
    const reports = this.reportsRepo.find();
    return reports;
  }

  async createEstimate(estimateDto: GetEstimateDto) {
    const { make, model, lng, lat, mileage, year } = estimateDto;

    const estimate = await this.reportsRepo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('approved = true')
      .andWhere('make = :make')
      .andWhere('model = :model')
      .andWhere('lng - :lng BETWEEN -5 AND 5')
      .andWhere('lat - :lat BETWEEN -5 AND 5')
      .andWhere('year - :year BETWEEN -3 AND 3')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters(estimateDto)
      .limit(3)
      .getRawOne();

    console.log(estimate);
    return estimate || 0;
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

  async changeApprobal(id: number, approved: boolean) {
    const report = await this.findById(id);
    if (!report) throw new NotFoundException('Report not Found');

    report.approved = approved;
    return await this.reportsRepo.save(report);
  }

  async deleteById(id: number) {
    const report = await this.findById(id);
    if (!report) throw new NotFoundException('Report not Found');

    return await this.reportsRepo.remove(report);
  }
}
