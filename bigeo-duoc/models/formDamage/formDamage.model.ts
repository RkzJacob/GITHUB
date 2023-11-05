import { ApiProperty } from '@nestjs/swagger';
import { Column, Table ,Model} from 'sequelize-typescript';

@Table({
  tableName: 'formDamage', // Especifica el nombre de la tabla existente en la base de datos
  timestamps: false,// Opcional: deshabilita las columnas createdAt y updatedAt
  freezeTableName: true, 
})

export class formDamage extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  @ApiProperty()
  dmgid: number;
  
  @Column
  @ApiProperty()
  damage: string;

  @Column
  @ApiProperty()
  observation?: string;
}

