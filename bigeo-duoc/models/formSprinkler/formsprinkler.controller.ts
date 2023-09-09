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


  @Get('Conteo-defectos') //tipo de operacion y nombre
  @ApiOperation({ summary: 'Cuenta-Defectos-3-Meses-Atras' }) //descripción metodo
  @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formSprinkler] }) // Respuesta exitosa
  async CuentaDeDefectos() {
      return this.formSprinklerService.CuentaDefectos3mesesAtras();
    }
}