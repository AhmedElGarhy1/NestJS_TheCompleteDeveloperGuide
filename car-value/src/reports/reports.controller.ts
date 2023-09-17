import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { UpdateReportDto } from './dtos/update-report.dto';
import { Serialize } from '../interceptors/Serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { AdminGuard } from '../guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@UseGuards(AuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @Serialize(ReportDto)
  async createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    const report = await this.reportsService.create(body, user);
    return report;
  }

  @Get()
  async getEstimate(@Query() reportData: GetEstimateDto) {
    const reports = await this.reportsService.createEstimate(reportData);
    return reports;
  }

  @Serialize(ReportDto)
  @Get(':id')
  async getReport(@Param('id') id: number) {
    const reports = await this.reportsService.findById(id);
    return reports;
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async updateReport(
    @Param('id') id: number,
    @Body() reportData: UpdateReportDto,
  ) {
    const report = await this.reportsService.changeApprobal(
      id,
      reportData.approved,
    );

    return report;
  }

  @Delete(':id')
  async deleteReport(@Param('id') id: number) {
    const reports = await this.reportsService.deleteById(id);
    return reports;
  }
}
