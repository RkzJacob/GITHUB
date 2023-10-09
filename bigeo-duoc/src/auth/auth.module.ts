/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from 'models/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { user } from 'models/user/user.model';
import { jwtConstants } from './constants/jwt.constants';





@Module({
  imports: [JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: "1d" },
  }),
    UserModule,SequelizeModule.forFeature([user])],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
