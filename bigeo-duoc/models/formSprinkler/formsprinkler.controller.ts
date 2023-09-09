/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { ApiTags ,ApiOperation, ApiResponse} from '@nestjs/swagger';
import { FormSprinklerService } from './formsprinkler.service';
import { formSprinkler } from './formSprinkler.model.';


@ApiTags('formSprinkler')
@Controller('formSprinkler')
export class FormSprinklerController { 
    constructor(private readonly formSprinklerService: FormSprinklerService) {}

  @Get('cantidad-defectos')
  @ApiOperation({ summary: 'cantidad de usuarios registrados' }) // Resumen de la operación
  @ApiResponse({ status: 200, description: 'Lista de usuarios', type: [formSprinkler] }) // Respuesta exitosa
  async obtenerCantidadDefectos(): Promise<any[]>  {
    const defectos = await this.formSprinklerService.ObtenerCantidadDefectos();
    return defectos;
    
    }
}