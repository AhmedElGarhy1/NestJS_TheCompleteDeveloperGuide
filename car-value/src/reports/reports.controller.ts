import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { AuthGaurd } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { UpdateReportDto } from './dtos/update-report.dto';

@UseGuards(AuthGaurd)
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  async createReport(@Body() body: CreateReportDto) {
    const report = await this.reportsService.create(body);
    return report;
  }

  @Get()
  async getAllReports(@CurrentUser() user: User) {
    const reports = await this.reportsService.getAll();
    return reports;
  }

  @Get(':id')
  async getReport(@Param('id') id: number) {
    const reports = await this.reportsService.findById(id);
    return reports;
  }

  @Patch(':id')
  async updateReport(
    @Param('id') id: number,
    @Body() reportData: UpdateReportDto,
  ) {
    const reports = await this.reportsService.update(id, reportData);
    return reports;
  }

  @Delete(':id')
  async deleteReport(@Param('id') id: number) {
    const reports = await this.reportsService.deleteById(id);
    return reports;
  }
}
