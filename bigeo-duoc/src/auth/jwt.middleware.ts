/*
https://docs.nestjs.com/middleware#middleware
*/

import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]; // Obtén el token del header

    if (token) {
      try {
        const payload = this.jwtService.verify(token); // Verifica el token
        req['user'] = payload; // Añade el payload a la solicitud para su uso posterior
      } catch (error) {
        // Si hay un error al verificar el token, puedes manejarlo aquí
        // Por ejemplo, puedes responder con un código de estado 401 (No autorizado)
        res.status(401).json({ message: 'Token inválido' });
        return;
      }
    } else {
      // Si no se proporciona un token en el header, puedes responder con un código de estado 401
      res.status(401).json({ message: 'Token no proporcionado' });
      return;
    }

    next(); // Continúa con el siguiente middleware o controlador
  }
}
