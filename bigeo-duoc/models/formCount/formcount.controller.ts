/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FormCountService } from './formcount.service';
import { formCount } from './formCount.model';

@ApiBearerAuth()
//@UseGuards(AuthGuard)
@ApiTags('formCount')
@Controller('formCount')
export class FormCountController { 
    constructor(private readonly formCountService: FormCountService,
        /* private readonly jwtService: JwtService */) {}
    
    @Get('Fruit-Cerro-Tunel/:Fecha1/:Fecha2') // Ruta con parámetro
    @ApiOperation({ summary: 'cantidad de fruit' }) //descripción metodo
    @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formCount] }) // Respuesta exitosa
    async obtCompCerroTunel23(@Param('Fecha1') Fecha1: string,@Param('Fecha2') Fecha2: string) {
        return this.formCountService.obtCompCerroTunel(Fecha1,Fecha2);
    }

    @Get('Fruit-Cerro-Casa/:Fecha1/:Fecha2') // Ruta con parámetro
    @ApiOperation({ summary: 'cantidad de fruit' }) //descripción metodo
    @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formCount] }) // Respuesta exitosa
    async obtCompCerroCasa23(@Param('Fecha1') Fecha1: string,@Param('Fecha2') Fecha2: string) {
        return this.formCountService.obtCompCerroCasa(Fecha1,Fecha2);
    }

    @Get('Fruit-Cerro-Esperanza/:Fecha1/:Fecha2') // Ruta con parámetro
    @ApiOperation({ summary: 'cantidad de fruit' }) //descripción metodo
    @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formCount] }) // Respuesta exitosa
    async obtCompCerroEsperanza23(@Param('Fecha1') Fecha1: string,@Param('Fecha2') Fecha2: string) {
        return this.formCountService.obtCompCerroEsperanza(Fecha1,Fecha2);
    }




}
