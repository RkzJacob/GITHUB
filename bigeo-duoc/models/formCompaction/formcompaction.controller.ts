/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FormCompactionService } from './formcompaction.service';
import { formCompaction } from './formCompaction.model';


@ApiBearerAuth()
//@UseGuards(AuthGuard)
@ApiTags('formCompaction')
@Controller('formCompaction')
export class FormCompactionController {
    constructor(private readonly formCompactionService: FormCompactionService,
        /* private readonly jwtService: JwtService */) {}

    @Get('Pressure-Cerro-Tunel/:Fecha1/:Fecha2') // Ruta con parámetro
    @ApiOperation({ summary: 'cantidad de pressure' }) //descripción metodo
    @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formCompaction] }) // Respuesta exitosa
    async obtCompCerroTunel(@Param('Fecha1') Fecha1: string,@Param('Fecha2') Fecha2: string) {
        return this.formCompactionService.obtCompCerroTunel(Fecha1,Fecha2);
    }

    @Get('Pressure-Cerro-Casa/:Fecha1/:Fecha2') // Ruta con parámetro
    @ApiOperation({ summary: 'cantidad de pressure' }) //descripción metodo
    @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formCompaction] }) // Respuesta exitosa
    async obtCompCerroCasa(@Param('Fecha1') Fecha1: string,@Param('Fecha2') Fecha2: string) {
        return this.formCompactionService.obtCompCerroCasa(Fecha1,Fecha2);
    }

    @Get('Pressure-Cerro-Esperanza/:Fecha1/:Fecha2') // Ruta con parámetro
    @ApiOperation({ summary: 'cantidad de pressure' }) //descripción metodo
    @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formCompaction] }) // Respuesta exitosa
    async obtCompCerroEsperanza(@Param('Fecha1') Fecha1: string,@Param('Fecha2') Fecha2: string) {
        return this.formCompactionService.obtCompCerroEsperanza(Fecha1,Fecha2);
    }


    
}
