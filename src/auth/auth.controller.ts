import { Controller, Get, Post, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { Login_dto, Register_dto } from './model';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res
      .status(200)
      .clearCookie('jwt', { secure: true, httpOnly: true, sameSite: 'none' });
  }

  @Post('login')
  login(@Body() dto: Login_dto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(dto, res);
  }

  @Post('register')
  register(@Body() dto: Register_dto) {
    return this.authService.register(dto);
  }
}
