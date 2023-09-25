
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags ,ApiOperation, ApiResponse} from '@nestjs/swagger';
import { FormSprinklerService } from './formsprinkler.service';
import { formSprinkler } from './formSprinkler.model.';
import { JwtGuard } from 'src/auth/authguard.guard';






@ApiTags('formSprinkler')
@Controller('formSprinkler')
export class FormSprinklerController { 
    constructor(private readonly formSprinklerService: FormSprinklerService,
                 /* private readonly jwtService: JwtService */) {}
 
  @Get('Conteo-defectos') //tipo de operacion y nombre
  @ApiOperation({ summary: 'Cuenta Defectos 3 Meses Atras' }) //descripción metodo
  @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formSprinkler] }) // Respuesta exitosa
  async CuentaDeDefectos() {
      return this.formSprinklerService.CuentaDefectos3mesesAtras();
    }

  @Get('Conteo-Todos-Los-Defectos') //tipo de operacion y nombre
  @ApiOperation({ summary: 'Conteo de todos los defectos registrados' }) //descripción metodo
  @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formSprinkler] }) // Respuesta exitosa
  async ObtenerDefectos() {
      return this.formSprinklerService.ObtenerTodosLosDefectosExistentes();
      }
      
  @Get('Conteo-Todos-Los-Defectos-Porc') //tipo de operacion y nombre
  @ApiOperation({ summary: 'Conteo de todos los defectos en porcentaje' }) //descripción metodo
  @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formSprinkler] }) // Respuesta exitosa
  async ObtenerDefectosPorc() {
      return this.formSprinklerService.ObtenerDefectosPorcentaje();
      }

  @Get('Conteo-Defectos-Por-Sector') //tipo de operacion y nombre
  @ApiOperation({ summary: 'Conteo de todos los defectos en porcentaje' }) //descripción metodo
  @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formSprinkler] }) // Respuesta exitosa
  async ObtenerDefectosPorSec() {
      return this.formSprinklerService.ObtenerDefectosPorSector();
      }    
}