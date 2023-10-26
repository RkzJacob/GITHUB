/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import * as fs from 'fs';

@Controller('Clientes')
export class ClienteController {
    constructor(private readonly jsonService: ClienteService) {}

    @Get('todos-los-clientes')
    getJsonData() {
        return this.jsonService.getJsonData();
    }

    @Get('Cerros')
    getCerros() {
        return this.jsonService.getCerros();
    }

    @Get('Sectores-por-Cerro/:nombreCerro')
    getSectoresPorCerro(@Param('nombreCerro') nombreCerro: string) {
        return this.jsonService.getSectoresByCerro(nombreCerro);
    }

}
