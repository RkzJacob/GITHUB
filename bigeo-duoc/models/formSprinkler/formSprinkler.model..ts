import { ApiProperty } from '@nestjs/swagger';
import { Column, Table ,Model} from 'sequelize-typescript';

@Table({
  tableName: 'formSprinkler', // Especifica el nombre de la tabla existente en la base de datos
  timestamps: false, // Opcional: deshabilita las columnas createdAt y updatedAt
})
export class formSprinkler extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  @ApiProperty()
  spid: number;

  @Column
  @ApiProperty()
  spcode: string;

  @Column
  @ApiProperty()
  defect: string;

  @Column
  @ApiProperty()
  repaired: string;

  @Column
  @ApiProperty()
  observation: string;
  
  
}

