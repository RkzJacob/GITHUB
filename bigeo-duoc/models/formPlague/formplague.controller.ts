/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller ,Get} from '@nestjs/common';
import { ApiTags ,ApiOperation, ApiResponse} from '@nestjs/swagger';
import { FormPlagueService } from './formplague.service';
import { formPlague } from './formplague.model';

@ApiTags('formPlague')
@Controller('formPlague')
export class FormPlagueController {
    constructor(private readonly FormPlagueService: FormPlagueService){
        
    }
    @Get('Conteo-plagas') //tipo de operacion y nombre
    @ApiOperation({ summary: 'Cuenta plagas por sector' }) //descripción metodo
    @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formPlague] }) // Respuesta exitosa
    async ConteoPlagas() {
        return this.FormPlagueService.ConteoPlagas();
      }
    @Get('Conteo-plagas-sectores') //tipo de operacion y nombre
    @ApiOperation({ summary: 'Cuenta plagas por sector' }) //descripción metodo
    @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formPlague] }) // Respuesta exitosa
    async CuentaDeDefectos() {
        return this.FormPlagueService.CantidadPlagasPorSector();
      }



}
