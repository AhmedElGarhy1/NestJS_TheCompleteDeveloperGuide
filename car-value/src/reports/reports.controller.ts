import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-reports.dto';
import { AuthGaurd } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';

@UseGuards(AuthGaurd)
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  async createReport(@Body() body: CreateReportDto) {
    const report = this.reportsService.create(body);
    return report;
  }
  @Get()
  async getAllReports(@CurrentUser() user: User) {
    console.log(user);
    return [];
  }
}
