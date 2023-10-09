/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Request, Post, UseGuards, Body, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Auth } from './decoratos/auth.decorators';
import { Role } from './enums/rol.enum';

interface RequestWithUser extends Request {
  user: { name: string; role: string };
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @Auth(Role.USER)
  profile(@Request() req: RequestWithUser) {
  return req.user;
}
}
