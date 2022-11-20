import { Controller, Get, Post, Body, Headers, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ILogin, IRegister } from './model';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('')
  homePage() {
    return 'Welcome to the home page';
  }

  @Get('dashboard')
  dashboard(
    @Headers('authorization') authToken: string,
    @Res()
    response: {
      redirect: (arg0: string) => void;
      json: (arg0: string) => void;
    },
  ) {
    return authToken
      ? this.authService.dashboard(authToken, response)
      : response.redirect('/');
  }

  @Post('login')
  login(@Body() dto: ILogin) {
    return this.authService.login(dto);
  }

  @Post('register')
  register(@Body() dto: IRegister) {
    return this.authService.register(dto);
  }
}
