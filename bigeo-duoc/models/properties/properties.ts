import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface propertiesAttributes {
  propid: number;
  userId: string;
  dateTime: Date;
  formSprinklerSpid?: number;
  formDamageDmgid?: number;
  formHumidityHmdid?: number;
  formCompactionCptid?: number;
  formFaunaFauid?: number;
  formCountCntid?: number;
  formDiseasesDisid?: number;
  formGirdlingGirid?: number;
  formPlaguePlid?: number;
  sector?: string;
}

export type propertiesPk = "propid";
export type propertiesId = properties[propertiesPk];
export type propertiesOptionalAttributes = "propid" | "formSprinklerSpid" | "formDamageDmgid" | "formHumidityHmdid" | "formCompactionCptid" | "formFaunaFauid" | "formCountCntid" | "formDiseasesDisid" | "formGirdlingGirid" | "formPlaguePlid" | "sector";
export type propertiesCreationAttributes = Optional<propertiesAttributes, propertiesOptionalAttributes>;

export class properties extends Model<propertiesAttributes, propertiesCreationAttributes> implements propertiesAttributes {
  propid!: number;
  userId!: string;
  dateTime!: Date;
  formSprinklerSpid?: number;
  formDamageDmgid?: number;
  formHumidityHmdid?: number;
  formCompactionCptid?: number;
  formFaunaFauid?: number;
  formCountCntid?: number;
  formDiseasesDisid?: number;
  formGirdlingGirid?: number;
  formPlaguePlid?: number;
  sector?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof properties {
    return properties.init({
    propid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    formSprinklerSpid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    formDamageDmgid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    formHumidityHmdid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    formCompactionCptid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    formFaunaFauid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    formCountCntid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    formDiseasesDisid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    formGirdlingGirid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    formPlaguePlid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sector: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'properties',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK_05543bf240999bf89289d52439b",
        unique: true,
        fields: [
          { name: "propid" },
        ]
      },
    ]
  });
  }
}
