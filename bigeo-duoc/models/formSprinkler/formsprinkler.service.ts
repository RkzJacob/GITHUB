/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { formSprinkler } from './formSprinkler.model.';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';

@Injectable()
export class FormSprinklerService { 
    constructor(
        @InjectModel(formSprinkler)
        private readonly sprinklerModel: typeof formSprinkler,
      ) {}
      
    async ObtenerCantidadDefectos(): Promise <any[]> {
        const defects  = await this.sprinklerModel.findAll({
            attributes: ['defect',
            [Sequelize.fn('COUNT', Sequelize.col('defect')), 'cantidad']], // Selecciona solo el campo 'username'
            group: ['defect'],
          });

          

          return defects.map((defect) => ({
            defecto: defect.defect,
            cantidad: defect.cantidad
          }));
    }
          
         
         
    }

