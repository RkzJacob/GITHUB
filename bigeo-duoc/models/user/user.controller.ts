//
import { ApiTags ,ApiOperation, ApiResponse, ApiBearerAuth} from '@nestjs/swagger';
import { user } from './user.model';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Role } from 'src/auth/enums/rol.enum';
import { Auth } from 'src/auth/decoratos/auth.decorators';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService ){}

    @Auth(Role.USER)
    @Get('Todos-los-usuarios')
    @ApiOperation({ summary: 'Encontrar a todos los usuarios' }) // Resumen de la operación
    @ApiResponse({ status: 200, description: 'Lista de usuarios', type: [user] }) // Respuesta exitosa
    async findAllUsers(): Promise<any[]> {
        const usernames = await this.userService.findAllUsernames();
        return usernames;
    }

    @Get('count')
    @Auth(Role.USER)
    @ApiOperation({ summary: 'cantidad de usuarios registrados' }) // Resumen de la operación
    @ApiResponse({ status: 200, description: 'Lista de usuarios', type: [user] }) // Respuesta exitosa
    async countUsers(): Promise<{ count: number }> {
        const count = await this.userService.countUsers(); // Llama al método del servicio
        return { count }; // Devuelve el conteo en formato JSON
      }

    
}

