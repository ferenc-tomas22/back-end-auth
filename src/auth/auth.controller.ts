import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login_dto, Register_dto } from './model';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() dto: Login_dto) {
    return this.authService.login(dto);
  }

  @Post('register')
  register(@Body() dto: Register_dto) {
    return this.authService.register(dto);
  }
}
