//
import { ApiTags ,ApiOperation, ApiResponse} from '@nestjs/swagger';
import { user } from './user.model';
import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService ){}

    @Get('Todos-los-usuarios')
    @ApiOperation({ summary: 'Encontrar a todos los usuarios' }) // Resumen de la operación
    @ApiResponse({ status: 200, description: 'Lista de usuarios', type: [user] }) // Respuesta exitosa
    async findAllUsers(): Promise<any[]> {
        const usernames = await this.userService.findAllUsernames();
        return usernames;
    }

    @Get('count')
    @ApiOperation({ summary: 'cantidad de usuarios registrados' }) // Resumen de la operación
    @ApiResponse({ status: 200, description: 'Lista de usuarios', type: [user] }) // Respuesta exitosa
    async countUsers(): Promise<{ count: number }> {
        const count = await this.userService.countUsers(); // Llama al método del servicio
        return { count }; // Devuelve el conteo en formato JSON
      }
}

