import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface formHumidityAttributes {
  hmdid: number;
  moisture20: string;
  moisture40: string;
  moisture60: string;
  roots: string;
  observation?: string;
}

export type formHumidityPk = "hmdid";
export type formHumidityId = formHumidity[formHumidityPk];
export type formHumidityOptionalAttributes = "hmdid" | "observation";
export type formHumidityCreationAttributes = Optional<formHumidityAttributes, formHumidityOptionalAttributes>;

export class formHumidity extends Model<formHumidityAttributes, formHumidityCreationAttributes> implements formHumidityAttributes {
  hmdid!: number;
  moisture20!: string;
  moisture40!: string;
  moisture60!: string;
  roots!: string;
  observation?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof formHumidity {
    return formHumidity.init({
    hmdid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    moisture20: {
      type: DataTypes.STRING,
      allowNull: false
    },
    moisture40: {
      type: DataTypes.STRING,
      allowNull: false
    },
    moisture60: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roots: {
      type: DataTypes.STRING,
      allowNull: false
    },
    observation: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'formHumidity',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK_85a9a7a3a598893f34022cca7c4",
        unique: true,
        fields: [
          { name: "hmdid" },
        ]
      },
    ]
  });
  }
}
