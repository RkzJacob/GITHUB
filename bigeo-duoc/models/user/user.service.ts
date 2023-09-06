import { Injectable } from '@nestjs/common';
import { user } from './user.model';
import { promises } from 'dns';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(user)
        private readonly userModel: typeof user,
      ) {}
      
    async findAllUsernames(): Promise <any[]> {
        const users = await this.userModel.findAll({
            attributes: ['username'], // Selecciona solo el campo 'username'
          });
      
          return users.map((user) => user.username);
    }

    async countUsers(): Promise<number> {
        const count = await this.userModel.count();
        return count;
      }
    

}
