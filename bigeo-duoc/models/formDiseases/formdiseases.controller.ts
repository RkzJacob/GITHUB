/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { FormDiseasesService } from './formdiseases.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { formDiseases } from './formDiseases.model';

@ApiBearerAuth()
//@UseGuards(AuthGuard)
@ApiTags('formDiseases')
@Controller('formDiseases')
export class FormDiseasesController {
    constructor(private readonly formDiseasesService: FormDiseasesService,
        /* private readonly jwtService: JwtService */) {}

    @Get('Diseases-Cerro-Tunel/:Fecha1/:Fecha2') // Ruta con parámetro
    @ApiOperation({ summary: 'cantidad de diseases' }) //descripción metodo
    @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formDiseases] }) // Respuesta exitosa
    async obtCompCerroTunel(@Param('Fecha1') Fecha1: string,@Param('Fecha2') Fecha2: string) {
        return this.formDiseasesService.obtCompCerroTunel(Fecha1,Fecha2);
    }

    @Get('Diseases-Cerro-Casa/:Fecha1/:Fecha2') // Ruta con parámetro
    @ApiOperation({ summary: 'cantidad de Diseases' }) //descripción metodo
    @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formDiseases] }) // Respuesta exitosa
    async obtCompCerroCasa(@Param('Fecha1') Fecha1: string,@Param('Fecha2') Fecha2: string) {
        return this.formDiseasesService.obtCompCerroCasa(Fecha1,Fecha2);
    }

    @Get('Diseases-Cerro-Esperanza/:Fecha1/:Fecha2') // Ruta con parámetro
    @ApiOperation({ summary: 'cantidad de Diseases' }) //descripción metodo
    @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formDiseases] }) // Respuesta exitosa
    async obtCompCerroEsperanza(@Param('Fecha1') Fecha1: string,@Param('Fecha2') Fecha2: string) {
        return this.formDiseasesService.obtCompCerroEsperanza(Fecha1,Fecha2);
    }

}
