/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FormPlagueController } from './formplague.controller';
import { FormPlagueService } from './formplague.service';
import { formPlague } from './formplague.model';
@Module({
    imports: [SequelizeModule.forFeature([formPlague])],
    controllers: [FormPlagueController],
    providers: [FormPlagueService],
    exports: [SequelizeModule]
})
export class FormPlagueModule {}

