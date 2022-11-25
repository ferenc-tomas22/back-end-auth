import { Controller, Get, UseGuards, Res } from '@nestjs/common';
import { Response } from 'express';
import { JwtGuard } from './auth/guard';

@Controller('')
export class AppController {
  constructor() {}

  @UseGuards(JwtGuard)
  @Get('dashboard')
  getDashboard(@Res() response: Response) {
    return response.status(200).json({ title: 'Welcome to secured dashboard' });
  }
}
