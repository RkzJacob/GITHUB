/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
    imports: [JwtModule.register({
        secret: 'tu_secreto_secreto', // Reemplaza esto con una clave secreta segura
        signOptions: { expiresIn: '1h' },
      }),
    ],
    controllers: [],
    providers: [JwtModule, JwtService],
})
export class JwtMModule {}
