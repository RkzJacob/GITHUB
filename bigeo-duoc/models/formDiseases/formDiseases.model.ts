import { ApiProperty } from '@nestjs/swagger';
import { Column, Table ,Model} from 'sequelize-typescript';
import { Col } from 'sequelize/types/utils';

@Table({
  tableName: 'formFauna', // Especifica el nombre de la tabla existente en la base de datos
  timestamps: false,// Opcional: deshabilita las columnas createdAt y updatedAt
  freezeTableName: true, 
})

export class formDiseases extends Model  {
  @Column({ primaryKey: true, autoIncrement: true })
  @ApiProperty()
  disid: number;

  @Column
  @ApiProperty()
  diseases?: string;

  @Column
  @ApiProperty()
  level?: string;

  @Column
  @ApiProperty()
  observation?: string;
}

