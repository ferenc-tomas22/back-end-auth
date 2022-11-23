import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from './auth/guard';

@Controller('')
export class AppController {
  constructor() {}

  @UseGuards(JwtGuard)
  @Get('dashboard')
  getDashboard() {
    return 'Welcome to secured dashboard';
  }
}
