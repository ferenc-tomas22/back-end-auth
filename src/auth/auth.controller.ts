import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { Login_dto, Register_dto } from './model';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() dto: Login_dto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(dto, res);
  }

  @Post('register')
  register(@Body() dto: Register_dto) {
    return this.authService.register(dto);
  }
}
