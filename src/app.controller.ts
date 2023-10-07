import { AuthService } from './auth/auth.service';
import { Controller, Get,Request, Post, UseGuards, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Req } from '@nestjs/common';
import { AuthenticateGuard } from './auth/authenticated.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';


@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req): any {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Req() req): string {
    return req.user;
  }
}
