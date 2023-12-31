import { FormDiseasesService } from './../models/formDiseases/formdiseases.service';
import { FormDiseasesModule } from './../models/formDiseases/formdiseases.module';
import { FormDiseasesController } from './../models/formDiseases/formdiseases.controller';
import { FormCountService } from './../models/formCount/formcount.service';
import { FormCountModule } from './../models/formCount/formcount.module';
import { FormCountController } from './../models/formCount/formcount.controller';
import { FormDamageService } from './../models/formDamage/formdamage.service';
import { FormDamageModule } from './../models/formDamage/formdamage.module';
import { FormDamageController } from './../models/formDamage/formdamage.controller';
import { FormFaunaModule } from './../models/formFauna/formfauna.module';
import { FormFaunaService } from './../models/formFauna/formfauna.service';
import { FormFaunaController } from './../models/formFauna/formfauna.controller';
import { FormCompactionService } from './../models/formCompaction/formcompaction.service';
import { FormCompactionModule } from './../models/formCompaction/formcompaction.module';
import { FormCompactionController } from './../models/formCompaction/formcompaction.controller';
import { ClienteService } from './../models/cliente/cliente.service';
import { ClienteController } from './../models/cliente/cliente.controller';

import { FormSprinklerService } from './../models/formSprinkler/formsprinkler.service';
import { FormSprinklerModule } from './../models/formSprinkler/formsprinkler.module';
import { FormSprinklerController } from './../models/formSprinkler/formsprinkler.controller';
import { FormPlagueService } from './../models/formPlague/formplague.service';
import { FormPlagueModule } from './../models/formPlague/formplague.module';
import { FormPlagueController } from './../models/formPlague/formplague.controller';
import { UserModule } from './../models/user/user.module';
import { UserService } from './../models/user/user.service';
import { UserController } from './../models/user/user.controller';

import { Module, RequestMethod } from '@nestjs/common';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { user } from 'models/user/user.model';
import { treeService } from 'models/tree/tree.service';
import { treeController } from 'models/tree/tree.controller';
import { TreeModule } from 'models/tree/tree.module';
import { tree } from 'models/tree/tree.model';
import { formSprinkler } from 'models/formSprinkler/formSprinkler.model.';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { AuthController } from 'src/auth/auth.controller';
import { jwtConstants } from './auth/constants/jwt.constants';



@Module({
  imports: [
    FormDiseasesModule,
    FormCountModule,
    FormDamageModule,
    FormFaunaModule,
    FormCompactionModule,
    AuthModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      global: true,
      signOptions: { expiresIn: '20h' },
    }),
    FormSprinklerModule,
    FormPlagueModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: '18.116.150.135',
      port: 5432,
      username: 'duoc2023team1',
      password: 'duoc2023',
      database: 'bigeo-duoc',
      models: [user, tree, formSprinkler],
      autoLoadModels: true,
      synchronize: true,
    }),
    UserModule,
    TreeModule,
    FormSprinklerModule,
  ],
  controllers: [
    FormDiseasesController,
    FormCountController,
    FormDamageController,
    FormFaunaController,
    FormCompactionController,
    ClienteController,
    FormSprinklerController,
    FormPlagueController,
    UserController,
    treeController,
    AuthController,
  ],
  providers: [
    FormDiseasesService,
    FormCountService,
    FormDamageService,
    FormFaunaService,
    FormCompactionService,
    ClienteService,
    FormSprinklerService,
    FormPlagueService,
    UserService,
    treeService,
    AppService]
})
export class AppModule {
  
}
