/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { formCount } from './formCount.model';
import { FormCountController } from './formcount.controller';
import { FormCountService } from './formcount.service';

@Module({
    imports: [SequelizeModule.forFeature([formCount])],
    controllers: [FormCountController],
    providers: [FormCountService],
    exports: [SequelizeModule]
})
export class FormCountModule { }
