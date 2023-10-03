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
    async ObtenerDefectosPorcentaje(): Promise<any> {
      const query = `
      SELECT defect, COUNT(defect) as cantidad,
      ROUND(((COUNT(defect)::NUMERIC / SUM(COUNT(defect)) OVER ()))*100,2) AS porcentaje
        FROM public.form 
        JOIN public.properties on (propid="propertiesPropid")
        JOIN public."formSprinkler" on (spid="formSprinklerSpid")
        GROUP BY defect
		    ORDER BY cantidad DESC
      `;  
      const result = await this.sequelize.query(query, { type: 'SELECT' });
      return result;     
    }

    async ObtenerDefectosPorSector(): Promise<any> {
      const query = `
      SELECT DISTINCT sector, COUNT(defect) as cantidad FROM public.form
      JOIN public.properties on propid="propertiesPropid"
      join public."formSprinkler" on spid="formSprinklerSpid"
      GROUP BY sector
      ORDER BY 1,2 ASC
      `;  
      const result = await this.sequelize.query(query, { type: 'SELECT' });
      return result;     
    }
    async obtenerDefectosPorSectorConParametro(parametro: string): Promise<any> {
      const query = `
      SELECT DISTINCT defect as defect, COUNT(defect) as cantidad FROM public.form
      JOIN public.properties on propid="propertiesPropid"
      join public."formSprinkler" on spid="formSprinklerSpid"
      where sector = $1
      group by defect
      ORDER BY 1,2 ASC
      
      `;
      const result = await this.sequelize.query(query, {
        type: 'SELECT',
        bind: [parametro], // Bind del parámetro
      });
      return result;
    }

    async ObtenerSector(): Promise<any> {
      const query = `
      SELECT DISTINCT sector FROM public.form
      JOIN public.properties on propid="propertiesPropid"
      join public."formSprinkler" on spid="formSprinklerSpid"
      GROUP BY sector
      `;  
      const result = await this.sequelize.query(query, { type: 'SELECT' });
      return result;     
    }
  }

