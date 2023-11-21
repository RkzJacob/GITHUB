/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
//@UseGuards(AuthGuard)
@ApiTags('Clientes')
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

    @Get('Sectores-unicos')
    getSectoresUnicos()  {
        return this.jsonService.getAllSectores();
    }

}
