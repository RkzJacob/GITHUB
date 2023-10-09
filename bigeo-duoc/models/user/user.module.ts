/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { user } from './user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants/jwt.constants';


@Module({
    imports: [SequelizeModule.forFeature([user])
    ,JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '20h' },
      }),],
    controllers: [UserController],
    providers: [UserService],
    exports: [SequelizeModule]
})
export class UserModule {}
