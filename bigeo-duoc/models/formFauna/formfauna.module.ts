/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { formFauna } from './formFauna.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FormFaunaController } from './formfauna.controller';
import { FormFaunaService } from './formfauna.service';

@Module({
    imports: [SequelizeModule.forFeature([formFauna])],
    controllers: [FormFaunaController],
    providers: [FormFaunaService],
    exports:[SequelizeModule]
})
export class FormFaunaModule {}
