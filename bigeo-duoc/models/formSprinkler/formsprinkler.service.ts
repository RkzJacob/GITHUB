import { Injectable } from '@nestjs/common';
import { formSprinkler } from './formSprinkler.model.';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';


@Injectable()
export class FormSprinklerService { 
    constructor(
        @InjectModel(formSprinkler)
        private readonly sprinklerModel: typeof formSprinkler,private readonly sequelize: Sequelize
      ) {}
      
  
    async CuentaDefectos3mesesAtras(): Promise<any> {
      const query = `
        SELECT defect, COUNT(defect) as cantidad, "dateTime"
        FROM "formSprinkler"
        INNER JOIN properties ON "formSprinkler".spid = properties."formSprinklerSpid"
        WHERE "dateTime" >= NOW() - INTERVAL '3 months'
        GROUP BY defect, "dateTime";
      `;
  
      const result = await this.sequelize.query(query, { type: 'SELECT' });
      return result; 
    }

    async ObtenerTodosLosDefectosExistentes(): Promise<any> {
      const query = `
      SELECT defect, COUNT(defect) as cantidad
      FROM form 
      INNER JOIN properties on properties.propid=form."propertiesPropid"
      INNER JOIN "formSprinkler" on "formSprinkler".spid=properties."formSprinklerSpid"
      GROUP BY defect
      ORDER BY cantidad DESC;
      `;
  
      const result = await this.sequelize.query(query, { type: 'SELECT' });
      return result;     
    }

  }

