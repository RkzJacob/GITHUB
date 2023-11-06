/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FormDamageService } from './formdamage.service';
import { formDamage } from './formDamage.model';

@ApiBearerAuth()
//@UseGuards(AuthGuard)
@ApiTags('formDamage')
@Controller('formDamage')
export class FormDamageController { 
    constructor(private readonly formDamageService: FormDamageService,
        /* private readonly jwtService: JwtService */) {}
    
    @Get('Damage-Cerro-Tunel/:Fecha1/:Fecha2') // Ruta con parámetro
    @ApiOperation({ summary: 'cantidad de daños' }) //descripción metodo
    @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formDamage] }) // Respuesta exitosa
    async obtCompCerroTunel(@Param('Fecha1') Fecha1: string,@Param('Fecha2') Fecha2: string) {
        return this.formDamageService.obtCompCerroTunel(Fecha1,Fecha2);
    }

    @Get('Damage-Cerro-Casa/:Fecha1/:Fecha2') // Ruta con parámetro
    @ApiOperation({ summary: 'cantidad de daños' }) //descripción metodo
    @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formDamage] }) // Respuesta exitosa
    async obtCompCerroCasa(@Param('Fecha1') Fecha1: string,@Param('Fecha2') Fecha2: string) {
        return this.formDamageService.obtCompCerroCasa(Fecha1,Fecha2);
    }

    @Get('Damage-Cerro-Esperanza/:Fecha1/:Fecha2') // Ruta con parámetro
    @ApiOperation({ summary: 'cantidad de daños' }) //descripción metodo
    @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formDamage] }) // Respuesta exitosa
    async obtCompCerroEsperanza(@Param('Fecha1') Fecha1: string,@Param('Fecha2') Fecha2: string) {
        return this.formDamageService.obtCompCerroEsperanza(Fecha1,Fecha2);
    }

    



}
