import { JwtService } from '@nestjs/jwt';

import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService { 
    constructor(private readonly jwtService: JwtService){}

    async validateToken(token: string): Promise<any> {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      return decoded;
    } catch (error) {
      // Si hay un error en la verificación, se lanzará una excepción.
      return null;
    }
  }
}
