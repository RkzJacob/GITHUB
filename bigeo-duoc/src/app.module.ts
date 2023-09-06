import { UserModule } from './../models/user/user.module';
import { UserService } from './../models/user/user.service';
import { UserController } from './../models/user/user.controller';

import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { user } from 'models/user/user.model';
import { treeService } from 'models/tree/tree.service';
import { treeController } from 'models/tree/tree.controller';
import { TreeModule } from 'models/tree/tree.module';
import { tree } from 'models/tree/tree.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: '18.116.150.135',
      port: 5432,
      username: 'duoc2023team1',
      password: 'duoc2023',
      database: 'bigeo-duoc',
      models: [user,tree],
      autoLoadModels:true,
      synchronize:true,
    }),
    UserModule,
    TreeModule,
  ],
  controllers: [
    UserController,
    treeController,
  ],
  providers: [
    UserService,
    treeService,
    AppService]
})
export class AppModule { }
