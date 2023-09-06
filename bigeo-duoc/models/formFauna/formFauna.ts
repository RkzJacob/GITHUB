import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface formFaunaAttributes {
  fauid: number;
  fauna: string;
  quantity: number;
  hint: string;
  observation?: string;
}

export type formFaunaPk = "fauid";
export type formFaunaId = formFauna[formFaunaPk];
export type formFaunaOptionalAttributes = "fauid" | "observation";
export type formFaunaCreationAttributes = Optional<formFaunaAttributes, formFaunaOptionalAttributes>;

export class formFauna extends Model<formFaunaAttributes, formFaunaCreationAttributes> implements formFaunaAttributes {
  fauid!: number;
  fauna!: string;
  quantity!: number;
  hint!: string;
  observation?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof formFauna {
    return formFauna.init({
    fauid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fauna: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hint: {
      type: DataTypes.STRING,
      allowNull: false
    },
    observation: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'formFauna',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK_8a0ab084a23e59d8609726d5f7f",
        unique: true,
        fields: [
          { name: "fauid" },
        ]
      },
    ]
  });
  }
}
