import { ApiProperty } from '@nestjs/swagger';
import { Column, Table ,Model} from 'sequelize-typescript';

@Table({
  tableName: 'formFauna', // Especifica el nombre de la tabla existente en la base de datos
  timestamps: false,// Opcional: deshabilita las columnas createdAt y updatedAt
  freezeTableName: true, 
})


export class formFauna extends Model  {
  @Column({ primaryKey: true, autoIncrement: true })
  @ApiProperty()
  fauid: number;

  @Column
  @ApiProperty()
  fauna: string;

  @Column
  @ApiProperty()
  quantity: number;

  @Column
  @ApiProperty()
  hint: string;

  @Column
  @ApiProperty()
  observation?: string;
}



