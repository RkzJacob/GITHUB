import { ApiProperty } from '@nestjs/swagger';
import { Column, Table ,Model} from 'sequelize-typescript';

@Table({
  tableName: 'formPlague', // Especifica el nombre de la tabla existente en la base de datos
  timestamps: false, // Opcional: deshabilita las columnas createdAt y updatedAt
})
export class formPlague extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  @ApiProperty()
  plid: number;

  @Column
  @ApiProperty()
  plague: string;

  @Column
  @ApiProperty()
  level: string;

  @Column
  @ApiProperty()
  population: string;

  @Column
  @ApiProperty()
  observation: string;
  
  
}
