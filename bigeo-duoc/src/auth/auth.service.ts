
import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/sequelize';
import { user } from 'models/user/user.model';
import {compare} from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(user)
    private readonly userModel: typeof user,
    private  jwtService: JwtService,
  ) {}

  
  async login(logindto: LoginDto) {
    const { username ,password} = logindto;
    const findUser = await this.userModel.findOne({ where: {username}});

    if (!findUser) throw new HttpException('USER_NOT_FOUND',404);
    

    const checkPassword = await compare(password,findUser.password);

    if(!checkPassword) throw new HttpException('PASSWORD_INVALID',403);
     

    const payload = {role: findUser.userRole};
    const token =  await this.jwtService.signAsync(payload);
    
    return {
      token,
      findUser,
    };
    
}

}
