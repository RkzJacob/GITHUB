import { Injectable } from '@nestjs/common';
import * as fs from 'fs';


@Injectable()
export class ClienteService {
  private readonly datos = JSON.parse(fs.readFileSync('./JSON/client.json', 'utf8'));

  getJsonData() {
    return this.datos;
  }

  getCerros() {
    return this.datos.cerros;
  }

  getSectoresByCerro(cerroNombre: string) {
    const cerro = this.datos.cerros.find(c => c.nombre === cerroNombre);

    if (cerro) {
      return cerro.sectores;
    }

    return null; 
  }
}


