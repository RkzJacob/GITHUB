import { ApiProperty } from '@nestjs/swagger';
import { Column, Table,Model } from 'sequelize-typescript';


@Table({
  tableName: 'tree', // Especifica el nombre de la tabla existente en la base de datos
  timestamps: false, // Opcional: deshabilita las columnas createdAt y updatedAt
})
export class tree extends Model {
  @Column({ primaryKey: true, autoIncrement: false })
  @ApiProperty()
  tree_id: number;
  @Column
  @ApiProperty()
  type: string;
  @Column
  @ApiProperty()
  plant_date?: string;
  @Column
  @ApiProperty()
  geometryGid: number;
  @Column
  @ApiProperty()
  status: string;
  @Column
  @ApiProperty()
  reference_id: string;
}


