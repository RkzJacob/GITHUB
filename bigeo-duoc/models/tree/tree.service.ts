import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { promises } from 'dns';
import { tree } from './tree.model';
import { track } from 'models/track/track.model';


@Injectable()
export class treeService {
    constructor(
        @InjectModel(tree)
        private readonly treeModel: typeof tree,
        
    ){}
    
    async findAll(): Promise<tree[]>{
        return this.treeModel.findAll();

    }
    
    async countTree(): Promise<number> {
        const count = await this.treeModel.count();
        return count;
      }
    
}
