/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { formDiseases } from './formDiseases.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FormDiseasesController } from './formdiseases.controller';
import { FormDiseasesService } from './formdiseases.service';

@Module({
    imports: [SequelizeModule.forFeature([formDiseases])],
    controllers: [FormDiseasesController],
    providers: [FormDiseasesService],
    exports:[SequelizeModule]
})
export class FormDiseasesModule { }
