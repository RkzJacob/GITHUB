/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { formSprinkler } from './formSprinkler.model.';
import { FormSprinklerController } from './formsprinkler.controller';
import { FormSprinklerService } from './formsprinkler.service';

@Module({
    imports: [SequelizeModule.forFeature([formSprinkler])],
    controllers: [FormSprinklerController],
    providers: [FormSprinklerService],
    exports: [SequelizeModule]
})
export class FormSprinklerModule { }
