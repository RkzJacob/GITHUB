import { ApiProperty } from '@nestjs/swagger';
import { Column, Table ,Model} from 'sequelize-typescript';

@Table({
  tableName: 'formCompaction', // Especifica el nombre de la tabla existente en la base de datos
  timestamps: false,// Opcional: deshabilita las columnas createdAt y updatedAt
  freezeTableName: true, 
})

export class formCompaction extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  @ApiProperty()
  cptid: number;

  @Column
  @ApiProperty()
  pressure: string;

  @Column
  @ApiProperty()
  observation?: string;
}



