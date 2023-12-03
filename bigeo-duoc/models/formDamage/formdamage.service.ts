/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { formDamage } from './formDamage.model';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import * as fs from 'fs/promises';

@Injectable()
export class FormDamageService { 
    constructor(
        @InjectModel(formDamage)
        private readonly formDamageModel: typeof formDamage,private readonly sequelize: Sequelize
      ) {}

      async obtCompCerroTunel(Fecha1: string, Fecha2: string): Promise<any> {
        try {
          // Leer el archivo JSON con la estructura
          const data = await fs.readFile('./JSON/client.json', 'utf8');
          const estructura = JSON.parse(data);
      
          // Encontrar el cerro "CerroTunel"
          const cerroTunel = estructura.cerros.find(cerro => cerro.nombre === "CerroTunel");
      
          if (!cerroTunel) {
            throw new Error('No se encontró el cerro "CerroTunel" en la estructura.');
          }
      
          const sectoresCerroTunel = cerroTunel.sectores;
      
          // Generar la lista de placeholders para los sectores en el query
          const placeholders = sectoresCerroTunel.map((_, index) => `$${index + 3}`).join(',');
      
          const query = `
            SELECT TO_CHAR("dateTime",'DD/MM/YYYY') as Fecha,damage ,COUNT(damage) as cantidad,
            sector as sector
            FROM public.form
            JOIN public.properties on propid="propertiesPropid"
            JOIN public."formDamage" on dmgid="formDamageDmgid"
            WHERE TO_CHAR("dateTime",'DD/MM/YYYY') BETWEEN $1 AND $2
            AND sector IN (${placeholders}) 
            GROUP BY damage,sector,Fecha
            ORDER BY 1,2 ASC
          `;
      
          const result = await this.sequelize.query(query, {
            type: 'SELECT',
            bind: [Fecha1, Fecha2, ...sectoresCerroTunel], // Bind de los parámetros
          });
      
          return result;
        } catch (error) {
          throw new Error(`Error al obtener los sectores y realizar la consulta: ${error.message}`);
        }
      }

      async obtCompCerroCasa(Fecha1: string, Fecha2: string): Promise<any> {
        try {
          // Leer el archivo JSON con la estructura
          const data = await fs.readFile('./JSON/client.json', 'utf8');
          const estructura = JSON.parse(data);
      
          // Encontrar el cerro "CerroTunel"
          const CerroCasa = estructura.cerros.find(cerro => cerro.nombre === "CerroCasa");
      
          if (!CerroCasa) {
            throw new Error('No se encontró el cerro "CerroCasa" en la estructura.');
          }
      
          const sectoresCerroCasa = CerroCasa.sectores;
      
          // Generar la lista de placeholders para los sectores en el query
          const placeholders = sectoresCerroCasa.map((_, index) => `$${index + 3}`).join(',');
      
          const query = `
            SELECT TO_CHAR("dateTime",'DD/MM/YYYY') as Fecha,damage ,COUNT(damage) as cantidad,
            sector as sector
            FROM public.form
            JOIN public.properties on propid="propertiesPropid"
            JOIN public."formDamage" on dmgid="formDamageDmgid"
            WHERE TO_CHAR("dateTime",'DD/MM/YYYY') BETWEEN $1 AND $2
            AND sector IN (${placeholders}) 
            GROUP BY damage,sector,Fecha
            ORDER BY 1,2 ASC
          `;
      
          const result = await this.sequelize.query(query, {
            type: 'SELECT',
            bind: [Fecha1, Fecha2, ...sectoresCerroCasa], // Bind de los parámetros
          });
      
          return result;
        } catch (error) {
          throw new Error(`Error al obtener los sectores y realizar la consulta: ${error.message}`);
        }
      }

      async obtCompCerroEsperanza(Fecha1: string, Fecha2: string): Promise<any> {
        try {
          // Leer el archivo JSON con la estructura
          const data = await fs.readFile('./JSON/client.json', 'utf8');
          const estructura = JSON.parse(data);
      
          // Encontrar el cerro "CerroTunel"
          const LaEsperanza = estructura.cerros.find(cerro => cerro.nombre === "LaEsperanza");
      
          if (!LaEsperanza) {
            throw new Error('No se encontró el cerro "sectoresLaEsperanza" en la estructura.');
          }
      
          const sectoresLaEsperanza = LaEsperanza.sectores;
      
          // Generar la lista de placeholders para los sectores en el query
          const placeholders = sectoresLaEsperanza.map((_, index) => `$${index + 3}`).join(',');
      
          const query = `
            SELECT TO_CHAR("dateTime",'DD/MM/YYYY') as Fecha,damage ,COUNT(damage) as cantidad,
            sector as sector
            FROM public.form
            JOIN public.properties on propid="propertiesPropid"
            JOIN public."formDamage" on dmgid="formDamageDmgid"
            WHERE TO_CHAR("dateTime",'DD/MM/YYYY') BETWEEN $1 AND $2
            AND sector IN (${placeholders}) 
            GROUP BY damage,sector,Fecha
            ORDER BY 1,2 ASC
          `;
      
          const result = await this.sequelize.query(query, {
            type: 'SELECT',
            bind: [Fecha1, Fecha2, ...sectoresLaEsperanza], // Bind de los parámetros
          });
      
          return result;
        } catch (error) {
          throw new Error(`Error al obtener los sectores y realizar la consulta: ${error.message}`);
        }
      }

      async CerroTunel2(): Promise<any> {
        try {
          // Leer el archivo JSON con la estructura
          const data = await fs.readFile('./JSON/client.json', 'utf8');
          const estructura = JSON.parse(data);
      
          // Encontrar el cerro "CerroTunel"
          const cerroTunel = estructura.cerros.find(cerro => cerro.nombre === "CerroTunel");
      
          if (!cerroTunel) {
            throw new Error('No se encontró el cerro "CerroTunel" en la estructura.');
          }
      
          const sectoresCerroTunel = cerroTunel.sectores;
      
          // Generar la lista de placeholders para los sectores en el query
          const placeholders = sectoresCerroTunel.map((_, index) => `$${index + 1}`).join(',');
          
          const query = `
            SELECT damage as damage, COUNT(damage) as cantidad,
            sector as sector
            FROM public.form
            JOIN public.properties on propid="propertiesPropid"
            JOIN public."formDamage" on dmgid="formDamageDmgid"
            WHERE sector IN (${placeholders}) 
            GROUP BY damage,sector
            ORDER BY 1,2 ASC
          `;
      
          const result = await this.sequelize.query(query, {
            type: 'SELECT',
            bind: [...sectoresCerroTunel], // Bind de los parámetros
          });
      
          return result;
        } catch (error) {
          throw new Error(`Error al obtener los sectores y realizar la consulta: ${error.message}`);
        }
      }
  
      async CerroCasa2(): Promise<any> {
        try {
          // Leer el archivo JSON con la estructura
          const data = await fs.readFile('./JSON/client.json', 'utf8');
          const estructura = JSON.parse(data);
      
          // Encontrar el cerro "CerroTunel"
          const CerroCasa2 = estructura.cerros.find(cerro => cerro.nombre === "CerroCasa");
      
          if (!CerroCasa2) {
            throw new Error('No se encontró el cerro "CerroCasa" en la estructura.');
          }
      
          const sectoresCerroCasa2 = CerroCasa2.sectores;
      
          // Generar la lista de placeholders para los sectores en el query
          const placeholders = sectoresCerroCasa2.map((_, index) => `$${index + 1}`).join(',');
          
          const query = `
          SELECT damage as damage, COUNT(damage) as cantidad,
            sector as sector
            FROM public.form
            JOIN public.properties on propid="propertiesPropid"
            JOIN public."formDamage" on dmgid="formDamageDmgid"
            WHERE sector IN (${placeholders}) 
            GROUP BY damage,sector
            ORDER BY 1,2 ASC
          `;
      
          const result = await this.sequelize.query(query, {
            type: 'SELECT',
            bind: [...sectoresCerroCasa2], // Bind de los parámetros
          });
      
          return result;
        } catch (error) {
          throw new Error(`Error al obtener los sectores y realizar la consulta: ${error.message}`);
        }
      }
  
      async CerroEsperanza2(): Promise<any> {
        try {
          // Leer el archivo JSON con la estructura
          const data = await fs.readFile('./JSON/client.json', 'utf8');
          const estructura = JSON.parse(data);
      
          // Encontrar el cerro "CerroTunel"
          const CerroEsperanza2 = estructura.cerros.find(cerro => cerro.nombre === "LaEsperanza");
      
          if (!CerroEsperanza2) {
            throw new Error('No se encontró el cerro "CerroTunel" en la estructura.');
          }
      
          const sectoresCerroEsperanza2 = CerroEsperanza2.sectores;
      
          // Generar la lista de placeholders para los sectores en el query
          const placeholders = sectoresCerroEsperanza2.map((_, index) => `$${index + 1}`).join(',');
          
          const query = `
          SELECT damage as damage, COUNT(damage) as cantidad,
            sector as sector
            FROM public.form
            JOIN public.properties on propid="propertiesPropid"
            JOIN public."formDamage" on dmgid="formDamageDmgid"
            WHERE sector IN (${placeholders}) 
            GROUP BY damage,sector
            ORDER BY 1,2 ASC
          `;
      
          const result = await this.sequelize.query(query, {
            type: 'SELECT',
            bind: [...sectoresCerroEsperanza2], // Bind de los parámetros
          });
      
          return result;
        } catch (error) {
          throw new Error(`Error al obtener los sectores y realizar la consulta: ${error.message}`);
        }
      }


}
