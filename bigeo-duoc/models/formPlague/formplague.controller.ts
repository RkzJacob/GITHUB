/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller ,Get} from '@nestjs/common';
import { ApiTags ,ApiOperation, ApiResponse} from '@nestjs/swagger';
import { FormPlagueService } from './formplague.service';
import { formPlague } from './formplague.model';

@ApiTags('formPlague')
@Controller('formPlague')
export class FormPlagueController {
    constructor(private readonly FormPlagueService: FormPlagueService){
        
    }





}
