/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { formPlague } from './formplague.model';
import { Sequelize } from 'sequelize';
@Injectable()
export class FormPlagueService {
    constructor(
        @InjectModel(formPlague)
        private readonly plagueModel: typeof formPlague, private readonly sequelize: Sequelize){
            
        }


}
