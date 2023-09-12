import { AuthService } from './auth.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

  @Post('validate-token')
  async validateToken(@Body() body): Promise<any> {
    const { token } = body;
    const user = await this.authService.validateToken(token);

    if (user) {
      return { isValid: true, user };
    } else {
      return { isValid: false };
    }
  }
 }
