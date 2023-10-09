import { Injectable } from '@nestjs/common';
import { user } from './user.model';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(user)
        private readonly userModel: typeof user,private readonly sequelize: Sequelize
      ) {}
      
    async findAllUsernames(): Promise <any[]> {
        const users = await this.userModel.findAll();
      
          return users;
    }

    
    async countUsers(): Promise<number> {
        const count = await this.userModel.count();
        return count;
      }
    

}
