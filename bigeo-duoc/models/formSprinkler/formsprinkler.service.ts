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

    async ObtenerDefectosPorSector(sector: string): Promise<any> {
      const query = `
      SELECT DISTINCT sector,defect, COUNT(defect) as cantidad 
      FROM public.form
      JOIN public.properties on propid="propertiesPropid"
      join public."formSprinkler" on spid="formSprinklerSpid"
      WHERE sector = $1
      GROUP BY sector,defect
      ORDER BY defect ASC,COUNT(defect) DESC
      `;  
      const result = await this.sequelize.query(query, { 
        type: 'SELECT' ,
        bind: [sector]});
      return result;     
    }

    async ObtenerDefectosPorCadaSector(): Promise<any> {
      const query = `
      SELECT DISTINCT sector,defect, COUNT(defect) as cantidad FROM public.form
      JOIN public.properties on propid="propertiesPropid"
      join public."formSprinkler" on spid="formSprinklerSpid"
      GROUP BY sector,defect
      ORDER BY 1,2 ASC
      `;  
      const result = await this.sequelize.query(query, { type: 'SELECT' });
      return result;     
    }

    async ObtenerTodosLosDefectosExistentesConParametroFecha(Fecha1: string,Fecha2: string,): Promise<any> {
      const query = `
      SELECT TO_CHAR("dateTime",'DD/MM/YYYY') as Fecha, defect as defect, COUNT(defect) as cantidad,
      sector as sector
      FROM public.form
      JOIN public.properties on propid="propertiesPropid"
      join public."formSprinkler" on spid="formSprinklerSpid"
      WHERE TO_CHAR("dateTime",'DD/MM/YYYY') BETWEEN $1 AND $2
      group by defect, Fecha, sector
      ORDER BY 1,2 ASC
      `;
      const result = await this.sequelize.query(query, {
        type: 'SELECT',
        bind: [Fecha1,Fecha2], // Bind del parámetro
      });
      return result;
    }

    async obtenerDefectosPorSectorConParametroFecha(Fecha1: string,Fecha2: string,): Promise<any> {
      const query = `
      SELECT TO_CHAR("dateTime",'DD/MM/YYYY') as Fecha, defect as defect, COUNT(defect) as cantidad,
      sector as sector
      FROM public.form
      JOIN public.properties on propid="propertiesPropid"
      join public."formSprinkler" on spid="formSprinklerSpid"
      WHERE TO_CHAR("dateTime",'DD/MM/YYYY') BETWEEN $1 AND $2
      group by defect, Fecha, sector
      ORDER BY 1,2 ASC
      `;
      const result = await this.sequelize.query(query, {
        type: 'SELECT',
        bind: [Fecha1,Fecha2], // Bind del parámetro
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

