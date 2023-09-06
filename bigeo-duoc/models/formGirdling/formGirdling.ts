import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface formGirdlingAttributes {
  girid: number;
  administration?: string;
  area?: string;
  sector?: string;
  percent?: string;
  stuckGirdling?: number;
  deepGirdling?: number;
  heightGirdling?: string;
  markGirdling?: string;
  cantGirdling?: string;
  injectedTree?: string;
  observation?: string;
}

export type formGirdlingPk = "girid";
export type formGirdlingId = formGirdling[formGirdlingPk];
export type formGirdlingOptionalAttributes = "girid" | "administration" | "area" | "sector" | "percent" | "stuckGirdling" | "deepGirdling" | "heightGirdling" | "markGirdling" | "cantGirdling" | "injectedTree" | "observation";
export type formGirdlingCreationAttributes = Optional<formGirdlingAttributes, formGirdlingOptionalAttributes>;

export class formGirdling extends Model<formGirdlingAttributes, formGirdlingCreationAttributes> implements formGirdlingAttributes {
  girid!: number;
  administration?: string;
  area?: string;
  sector?: string;
  percent?: string;
  stuckGirdling?: number;
  deepGirdling?: number;
  heightGirdling?: string;
  markGirdling?: string;
  cantGirdling?: string;
  injectedTree?: string;
  observation?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof formGirdling {
    return formGirdling.init({
    girid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    administration: {
      type: DataTypes.STRING,
      allowNull: true
    },
    area: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sector: {
      type: DataTypes.STRING,
      allowNull: true
    },
    percent: {
      type: DataTypes.STRING,
      allowNull: true
    },
    stuckGirdling: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    deepGirdling: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    heightGirdling: {
      type: DataTypes.STRING,
      allowNull: true
    },
    markGirdling: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cantGirdling: {
      type: DataTypes.STRING,
      allowNull: true
    },
    injectedTree: {
      type: DataTypes.STRING,
      allowNull: true
    },
    observation: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'formGirdling',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK_girdid",
        unique: true,
        fields: [
          { name: "girid" },
        ]
      },
    ]
  });
  }
}
