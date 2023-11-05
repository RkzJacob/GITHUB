/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { formCompaction } from './formCompaction.model';
import { FormCompactionController } from './formcompaction.controller';
import { FormCompactionService } from './formcompaction.service';

@Module({
    imports: [SequelizeModule.forFeature([formCompaction])],
    controllers: [FormCompactionController],
    providers: [FormCompactionService],
    exports: [SequelizeModule]
})
export class FormCompactionModule { }
