/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get,Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FormPlagueService } from './formplague.service';
import { formPlague } from './formplague.model';

@ApiTags('formPlague')
@Controller('formPlague')
export class FormPlagueController {
  constructor(private readonly FormPlagueService: FormPlagueService) {

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
  @Get('Plaga-Todos/:Fecha1/:Fecha2') //tipo de operacion y nombre
  @ApiOperation({ summary: 'Cuenta plagas por sector' }) //descripción metodo
  @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formPlague] }) // Respuesta exitosa
  async CuentaDeDefectosSectoresFecha(@Param('Fecha1') Fecha1: string,@Param('Fecha2') Fecha2: string) {
    return this.FormPlagueService.ConteoPlagasTodosLosSectores(Fecha1,Fecha2);
  }
  @Get('Plaga-Cerro-Tunel/:Fecha1/:Fecha2') //tipo de operacion y nombre
  @ApiOperation({ summary: 'Cuenta plagas por sector' }) //descripción metodo
  @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formPlague] }) // Respuesta exitosa
  async CuentaDeDefectosCerroTunel(@Param('Fecha1') Fecha1: string,@Param('Fecha2') Fecha2: string) {
    return this.FormPlagueService.ConteoPlagasCerroTunel(Fecha1,Fecha2);
  }
  @Get('Plaga-Cerro-Casa/:Fecha1/:Fecha2') //tipo de operacion y nombre
  @ApiOperation({ summary: 'Cuenta plagas por sector' }) //descripción metodo
  @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formPlague] }) // Respuesta exitosa
  async CuentaDeDefectosCerroCasa(@Param('Fecha1') Fecha1: string,@Param('Fecha2') Fecha2: string) {
    return this.FormPlagueService.ConteoPlagasCerroCasa(Fecha1,Fecha2);
  }
  @Get('Plaga-Cerro-Esperanza/:Fecha1/:Fecha2') //tipo de operacion y nombre
  @ApiOperation({ summary: 'Cuenta plagas por sector' }) //descripción metodo
  @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formPlague] }) // Respuesta exitosa
  async CuentaDeDefectosLaEsperanza(@Param('Fecha1') Fecha1: string,@Param('Fecha2') Fecha2: string) {
    return this.FormPlagueService.ConteoPlagasLaEsperanza(Fecha1,Fecha2);
  }


  @Get('Plaga-Cerro-Tunel-General/') // Ruta con parámetro
    @ApiOperation({ summary: 'cantidad de plagas' }) //descripción metodo
    @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formPlague] }) // Respuesta exitosa
    async obtCompCerroTunel2() {
        return this.FormPlagueService.CerroTunel2();
    }

    @Get('Plaga-Cerro-Casa-General/') // Ruta con parámetro
    @ApiOperation({ summary: 'cantidad de plagas' }) //descripción metodo
    @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formPlague] }) // Respuesta exitosa
    async obtCompCerroCasa2() {
        return this.FormPlagueService.CerroCasa2();
    }

    @Get('Plaga-Cerro-Esperanza-General/') // Ruta con parámetro
    @ApiOperation({ summary: 'cantidad de plagas' }) //descripción metodo
    @ApiResponse({ status: 200, description: 'Consulta realizada con exito', type: [formPlague] }) // Respuesta exitosa
    async obtCompCerroEsperanza2() {
        return this.FormPlagueService.CerroEsperanza2();
    }


}
