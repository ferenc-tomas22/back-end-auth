import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { login_dto, register_dto } from './model/model';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: login_dto) {
    return this.authService.login(dto);
  }

  @Post('register')
  register(@Body() dto: register_dto) {
    return this.authService.register(dto);
  }
}
