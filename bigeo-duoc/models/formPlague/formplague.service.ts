/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { formPlague } from './formplague.model';
import { Sequelize } from 'sequelize-typescript';
@Injectable()
export class FormPlagueService {
    constructor(
        @InjectModel(formPlague)
        private readonly plagueModel: typeof formPlague, private readonly sequelize: Sequelize) {

    }
    async CantidadPlagasPorSector(): Promise<any> {
        const query = `
        SELECT 
        sector, COUNT(plague) as cant_plaga
        FROM public.form
        JOIN public.properties pr on propid="propertiesPropid"
        LEFT join public."formPlague" pl on plid="formPlaguePlid"
        GROUP BY sector
        ORDER BY 2 DESC
            `;
        const result = await this.sequelize.query(query, { type: 'SELECT' });
        return result;
    }
    async ConteoPlagas(): Promise<any> {
        const query = `
        SELECT 
        sector,plague as plaga,
        level as nivel, population, observation
        FROM public.form
        JOIN public.properties pr on propid="propertiesPropid"
        join public."formPlague" pl on plid="formPlaguePlid"
        ORDER BY 2 
            `;
        const result = await this.sequelize.query(query, { type: 'SELECT' });
        return result;
    }

}
