
import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags ,ApiOperation, ApiResponse, ApiBearerAuth} from '@nestjs/swagger';
import { FormSprinklerService } from './formsprinkler.service';
import { formSprinkler } from './formSprinkler.model.';
import { Role } from 'src/auth/enums/rol.enum';
import { Auth } from 'src/auth/decoratos/auth.decorators';
import { AuthGuard } from 'src/auth/guard/auth.guard';



@ApiBearerAuth()
//@UseGuards(AuthGuard)
@ApiTags('formSprinkler')
@Controller('formSprinkler')
export class FormSprinklerController { 
    constructor(private readonly formSprinklerService: FormSprinklerService,
                 /* private readonly jwtService: JwtService */) {}
                 
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

  @Get('Conteo-Defectos-Por-Sector/:sector') //tipo de operacion y nombre
  @ApiOperation({ summary: 'Conteo de todos los defectos de un sector en determinado' }) //descripción metodo
  @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formSprinkler] }) // Respuesta exitosa
  async ObtenerDefectosPorSector(@Param('sector') sector: string) {
    return this.formSprinklerService.ObtenerDefectosPorSector(sector);
    } 

  @Get('Conteo-Defectos-Por-Sector/') //tipo de operacion y nombre
  @ApiOperation({ summary: 'Conteo de todos los defectos de todos los sectores' }) //descripción metodo
  @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formSprinkler] }) // Respuesta exitosa
  async ObtenerDefectosPorCadaSector() {
    return this.formSprinklerService.ObtenerDefectosPorCadaSector();
  } 

  @Get('Conteo-Todos-Los-Defectos/:Fecha1/:Fecha2') // Ruta con parámetro de fechas
  async obtenerDatosDefectos(@Param('Fecha1') Fecha1: string,@Param('Fecha2') Fecha2: string) {
    return this.formSprinklerService.ObtenerTodosLosDefectosExistentesConParametroFecha(Fecha1,Fecha2);
  } 
    
  @Get('Conteo-Defectos-Por-Sector/:Fecha1/:Fecha2') // Ruta con parámetro de fechas
  async obtenerDatos(@Param('Fecha1') Fecha1: string,@Param('Fecha2') Fecha2: string) {
    return this.formSprinklerService.obtenerDefectosPorSectorConParametroFecha(Fecha1,Fecha2);
  }   

  @Get('Sectores') // Ruta con parámetro
  @ApiOperation({ summary: 'Conteo los sectores unicos' }) //descripción metodo
  @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formSprinkler] }) // Respuesta exitosa
  async ObtenerSectores() {
    return this.formSprinklerService.ObtenerSector();
  } 

  @Get('ALL-sectores/:Fecha1/:Fecha2') // Ruta con parámetro
  @ApiOperation({ summary: 'Conteo de todos los defectos utilizando json' }) //descripción metodo
  @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formSprinkler] }) // Respuesta exitosa
  async TodosSectores(@Param('Fecha1') Fecha1: string,@Param('Fecha2') Fecha2: string) {
    return this.formSprinklerService.TodosLosSectores(Fecha1,Fecha2);
  }

  @Get('defectos-Cerro-Tunel/:Fecha1/:Fecha2') // Ruta con parámetro
  @ApiOperation({ summary: 'Conteo defectos por sector del cerroTunel' }) //descripción metodo
  @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formSprinkler] }) // Respuesta exitosa
  async getCerroTunel(@Param('Fecha1') Fecha1: string,@Param('Fecha2') Fecha2: string) {
    return this.formSprinklerService.CerroTunel(Fecha1,Fecha2);
  }

  @Get('defectos-Cerro-Casa/:Fecha1/:Fecha2') // Ruta con parámetro
  @ApiOperation({ summary: 'Conteo defectos por sector del CerroCasa' }) //descripción metodo
  @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formSprinkler] }) // Respuesta exitosa
  async getCerroCasa(@Param('Fecha1') Fecha1: string,@Param('Fecha2') Fecha2: string) {
    return this.formSprinklerService.CerroCasa(Fecha1,Fecha2);
  }

  @Get('defectos-Cerro-Esperanza/:Fecha1/:Fecha2') // Ruta con parámetro
  @ApiOperation({ summary: 'Conteo defectos por sector del Cerro Esperanza' }) //descripción metodo
  @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formSprinkler] }) // Respuesta exitosa
  async getCerroEsperanza(@Param('Fecha1') Fecha1: string,@Param('Fecha2') Fecha2: string) {
    return this.formSprinklerService.CerroCasa(Fecha1,Fecha2);
  }

  @Get('defectos-Cerro-Tunel-General') // Ruta con parámetro
  @ApiOperation({ summary: 'Conteo defectos por sector del Cerro tunel generales' }) //descripción metodo
  @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formSprinkler] }) // Respuesta exitosa
  async getCerroTunel2() {
    return this.formSprinklerService.CerroTunel2();
  }

  @Get('defectos-Cerro-casa-General') // Ruta con parámetro
  @ApiOperation({ summary: 'Conteo defectos por sector del cerro casa generales' }) //descripción metodo
  @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formSprinkler] }) // Respuesta exitosa
  async getCerroCasa2() {
    return this.formSprinklerService.CerroCasa2();
  }

  @Get('defectos-Cerro-Esperanza-General') // Ruta con parámetro
  @ApiOperation({ summary: 'Conteo defectos por sector del cerro esperanza generales' }) //descripción metodo
  @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formSprinkler] }) // Respuesta exitosa
  async getCerroEsperanza2() {
    return this.formSprinklerService.CerroEsperanza2();
  }




}