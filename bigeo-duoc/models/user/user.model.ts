import { ApiProperty } from '@nestjs/swagger';

import { Column, Table ,Model} from 'sequelize-typescript';

@Table({
  tableName: 'user', // Especifica el nombre de la tabla existente en la base de datos
  timestamps: false, // Opcional: deshabilita las columnas createdAt y updatedAt
  freezeTableName: true,
})
export class user extends Model  {
  @Column({ primaryKey: true, autoIncrement: false })
  @ApiProperty()
  username: string;

  @Column
  @ApiProperty()
  password: string;

  @Column
  @ApiProperty()
  name: string;

  @Column
  @ApiProperty()
  lastname: string;

  @Column
  @ApiProperty()
  userRole: string;
}

