import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';




@Module({
    imports: [
        JwtModule.register({
        secret: 'crknohyD4Lf9L9lGq322UjOKvn7wyJOewFzCf2Naz0g',
        signOptions: { expiresIn: '1h' },
    }),
    ],
    controllers: [AuthController],
    providers: [AuthService,],
})
export class AuthModule { }
