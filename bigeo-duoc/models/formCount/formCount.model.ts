import { ApiProperty } from '@nestjs/swagger';
import { Column, Table ,Model} from 'sequelize-typescript';

@Table({
  tableName: 'formCount', // Especifica el nombre de la tabla existente en la base de datos
  timestamps: false,// Opcional: deshabilita las columnas createdAt y updatedAt
  freezeTableName: true, 
})

export class formCount extends Model{
  @Column({ primaryKey: true, autoIncrement: true })
  @ApiProperty()
  cntid: number;

  @Column
  @ApiProperty()
  hasFruit: string;

  @Column
  @ApiProperty()
  observation?: string;

  @Column
  @ApiProperty()
  qty?: number;

  @Column
  @ApiProperty()
  unitMeasurement?: string;
}


