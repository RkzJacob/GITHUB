/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { formDamage } from './formDamage.model';
import { FormDamageController } from './formdamage.controller';
import { FormDamageService } from './formdamage.service';

@Module({
    imports: [SequelizeModule.forFeature([formDamage])],
    controllers: [FormDamageController],
    providers: [FormDamageService],
    exports: [SequelizeModule]
})
export class FormDamageModule { }
