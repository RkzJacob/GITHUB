import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface migrationsAttributes {
  id: number;
  timestamp: number;
  name: string;
}

export type migrationsPk = "id";
export type migrationsId = migrations[migrationsPk];
export type migrationsOptionalAttributes = "id";
export type migrationsCreationAttributes = Optional<migrationsAttributes, migrationsOptionalAttributes>;

export class migrations extends Model<migrationsAttributes, migrationsCreationAttributes> implements migrationsAttributes {
  id!: number;
  timestamp!: number;
  name!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof migrations {
    return migrations.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'migrations',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK_8c82d7f526340ab734260ea46be",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
