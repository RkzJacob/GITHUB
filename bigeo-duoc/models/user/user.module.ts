/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { user } from './user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [SequelizeModule.forFeature([user])],
    controllers: [UserController],
    providers: [UserService],
    exports: [SequelizeModule]
})
export class UserModule {}
