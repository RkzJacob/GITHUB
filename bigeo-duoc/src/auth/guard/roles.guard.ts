/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decoratos/roles.decorators';
import { Role } from '../enums/rol.enum';


@Injectable()
export class RolesGuard implements CanActivate {
constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean  {

    const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY,[
      context.getHandler(),
      context.getClass()
    ]);

    if (!role){
      return true;
    }

    console.log(role);
    const {user} = context.switchToHttp().getRequest();

    return role === user.role;
  }
}
