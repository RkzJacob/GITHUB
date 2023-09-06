import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface treeDataAttributes {
  data_id: number;
  tree_id?: number;
  type: string;
  observation?: string;
}

export type treeDataPk = "data_id";
export type treeDataId = treeData[treeDataPk];
export type treeDataOptionalAttributes = "data_id" | "tree_id" | "observation";
export type treeDataCreationAttributes = Optional<treeDataAttributes, treeDataOptionalAttributes>;

export class treeData extends Model<treeDataAttributes, treeDataCreationAttributes> implements treeDataAttributes {
  data_id!: number;
  tree_id?: number;
  type!: string;
  observation?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof treeData {
    return treeData.init({
    data_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tree_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    observation: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'treeData',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "treedata_pkey",
        unique: true,
        fields: [
          { name: "data_id" },
        ]
      },
    ]
  });
  }
}
