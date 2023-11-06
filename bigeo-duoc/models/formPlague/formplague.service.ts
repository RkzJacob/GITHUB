/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { formPlague } from './formplague.model';
import { Sequelize } from 'sequelize-typescript';
import * as fs from 'fs/promises';
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


    async ConteoPlagasTodosLosSectores(Fecha1: string, Fecha2: string,): Promise<any> {
        // Leer el archivo JSON con la estructura
        const data = await fs.readFile('./JSON/client.json', 'utf8');
        const estructura = JSON.parse(data);

        const sectores = [];

        // Iterar sobre los cerros y agregar los sectores a la lista
        for (const cerro of estructura.cerros) {
            sectores.push(...cerro.sectores);
        }

        // Generar la lista de placeholders para los sectores en el query
        const placeholders = sectores.map((_, index) => `$${index + 3}`).join(',');

        const query = `
        SELECT COALESCE(plague, 'Sin Plagas')  as plaga, COUNT(plague) as cant_plaga,
        sector as sector
        FROM public.form
        JOIN public.properties pr on propid="propertiesPropid"
        LEFT join public."formPlague" pl on plid="formPlaguePlid"
        WHERE TO_CHAR("dateTime",'DD/MM/YYYY') BETWEEN $1 AND $2
        AND sector IN (${placeholders}) 
        GROUP BY plague, sector
        ORDER BY cant_plaga DESC, sector ASC
        `;

        const result = await this.sequelize.query(query, {
            type: 'SELECT',
            bind: [Fecha1, Fecha2, ...sectores], // Bind de los parámetros
        });

        return result;
    }


    async ConteoPlagasCerroTunel(Fecha1: string, Fecha2: string): Promise<any> {
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
          SELECT COALESCE(plague, 'Sin Plagas')  as plaga, COUNT(plague) as cant_plaga,
          sector as sector
          FROM public.form
          JOIN public.properties pr on propid="propertiesPropid"
          LEFT join public."formPlague" pl on plid="formPlaguePlid"
          WHERE TO_CHAR("dateTime",'DD/MM/YYYY') BETWEEN $1 AND $2
          AND sector IN (${placeholders}) 
          GROUP BY plague, sector
          ORDER BY cant_plaga DESC, sector ASC
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

    async ConteoPlagasCerroCasa(Fecha1: string, Fecha2: string): Promise<any> {
        try {
            // Leer el archivo JSON con la estructura
            const data = await fs.readFile('./JSON/client.json', 'utf8');
            const estructura = JSON.parse(data);

            // Encontrar el cerro "CerroTunel"
            const CerroCasa = estructura.cerros.find(cerro => cerro.nombre === "CerroCasa");

            if (!CerroCasa) {
                throw new Error('No se encontró el cerro "CerroTunel" en la estructura.');
            }

            const sectoresCerroCasa = CerroCasa.sectores;

            // Generar la lista de placeholders para los sectores en el query
            const placeholders = sectoresCerroCasa.map((_, index) => `$${index + 3}`).join(',');

            const query = `
          SELECT COALESCE(plague, 'Sin Plagas')  as plaga, COUNT(plague) as cant_plaga,
          sector as sector
          FROM public.form
          JOIN public.properties pr on propid="propertiesPropid"
          LEFT join public."formPlague" pl on plid="formPlaguePlid"
          WHERE TO_CHAR("dateTime",'DD/MM/YYYY') BETWEEN $1 AND $2
          AND sector IN (${placeholders}) 
          GROUP BY plague, sector
          ORDER BY cant_plaga DESC, sector ASC
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

    async ConteoPlagasLaEsperanza(Fecha1: string, Fecha2: string): Promise<any> {
        try {
            // Leer el archivo JSON con la estructura
            const data = await fs.readFile('./JSON/client.json', 'utf8');
            const estructura = JSON.parse(data);

            // Encontrar el cerro "CerroTunel"
            const LaEsperanza = estructura.cerros.find(cerro => cerro.nombre === "LaEsperanza");

            if (!LaEsperanza) {
                throw new Error('No se encontró el cerro "CerroTunel" en la estructura.');
            }

            const sectoresLaEsperanza = LaEsperanza.sectores;

            // Generar la lista de placeholders para los sectores en el query
            const placeholders = sectoresLaEsperanza.map((_, index) => `$${index + 3}`).join(',');

            const query = `
          SELECT COALESCE(plague, 'Sin Plagas')  as plaga, COUNT(plague) as cant_plaga,
          sector as sector
          FROM public.form
          JOIN public.properties pr on propid="propertiesPropid"
          LEFT join public."formPlague" pl on plid="formPlaguePlid"
          WHERE TO_CHAR("dateTime",'DD/MM/YYYY') BETWEEN $1 AND $2
          AND sector IN (${placeholders}) 
          GROUP BY plague, sector
          ORDER BY cant_plaga DESC, sector ASC
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


}
