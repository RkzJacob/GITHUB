/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { tree } from './tree.model';
import { treeController } from './tree.controller';
import { treeService } from './tree.service';

@Module({
    imports: [SequelizeModule.forFeature([tree])],
    controllers: [treeController],
    providers: [treeService],
    exports: [SequelizeModule]
})
export class TreeModule {}
