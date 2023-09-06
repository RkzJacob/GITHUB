import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Controller, Get } from '@nestjs/common';
import {  treeService } from './tree.service';
import { tree } from './tree.model';

@ApiTags('tree')
@Controller('tree')
export class treeController {
    constructor(private treeService : treeService ){}

    @Get('count')
    @ApiOperation({ summary: 'cantidad de arboles registrados' }) // Resumen de la operación
    @ApiResponse({ status: 200, description: 'Lista de', type: [tree] }) // Respuesta exitosa
    async countUsers(): Promise<{ count: number }> {
        const count = await this.treeService.countTree(); // Llama al método del servicio
        return { count }; // Devuelve el conteo en formato JSON
      }
    



    
}

