/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FormFaunaService } from './formfauna.service';
import { formFauna } from './formFauna.model';

@ApiBearerAuth()
//@UseGuards(AuthGuard)
@ApiTags('formFauna')
@Controller('formFauna')
export class FormFaunaController {
    constructor(private readonly formFaunaService: FormFaunaService,
        /* private readonly jwtService: JwtService */) {}

    @Get('Fauna-Cerro-Tunel/:Fecha1/:Fecha2') // Ruta con parámetro
    @ApiOperation({ summary: 'cantidad de pressure' }) //descripción metodo
    @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formFauna] }) // Respuesta exitosa
    async obtCompCerroTunel(@Param('Fecha1') Fecha1: string,@Param('Fecha2') Fecha2: string) {
        return this.formFaunaService.obtCompCerroTunel(Fecha1,Fecha2);
    }

    @Get('Fauna-Cerro-Casa/:Fecha1/:Fecha2') // Ruta con parámetro
    @ApiOperation({ summary: 'cantidad de pressure' }) //descripción metodo
    @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formFauna] }) // Respuesta exitosa
    async obtCompCerroCasa(@Param('Fecha1') Fecha1: string,@Param('Fecha2') Fecha2: string) {
        return this.formFaunaService.obtCompCerroCasa(Fecha1,Fecha2);
    }

    @Get('Fauna-Cerro-Esperanza/:Fecha1/:Fecha2') // Ruta con parámetro
    @ApiOperation({ summary: 'cantidad de pressure' }) //descripción metodo
    @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formFauna] }) // Respuesta exitosa
    async obtCompCerroEsperanza(@Param('Fecha1') Fecha1: string,@Param('Fecha2') Fecha2: string) {
        return this.formFaunaService.obtCompCerroEsperanza(Fecha1,Fecha2);
    }



}
