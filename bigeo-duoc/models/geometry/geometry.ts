import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface geometryAttributes {
  gid: number;
  type: string;
  coordinates: number[];
}

export type geometryPk = "gid";
export type geometryId = geometry[geometryPk];
export type geometryOptionalAttributes = "gid";
export type geometryCreationAttributes = Optional<geometryAttributes, geometryOptionalAttributes>;

export class geometry extends Model<geometryAttributes, geometryCreationAttributes> implements geometryAttributes {
  gid!: number;
  type!: string;
  coordinates!: number[];


  static initModel(sequelize: Sequelize.Sequelize): typeof geometry {
    return geometry.init({
    gid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    coordinates: {
      type: DataTypes.ARRAY(DataTypes.DOUBLE),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'geometry',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK_66915e6c248f033c2cb21c14403",
        unique: true,
        fields: [
          { name: "gid" },
        ]
      },
    ]
  });
  }
}
