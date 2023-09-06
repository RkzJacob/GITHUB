import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface formCountAttributes {
  cntid: number;
  hasFruit: string;
  observation?: string;
  qty?: number;
  unitMeasurement?: string;
}

export type formCountPk = "cntid";
export type formCountId = formCount[formCountPk];
export type formCountOptionalAttributes = "cntid" | "observation" | "qty" | "unitMeasurement";
export type formCountCreationAttributes = Optional<formCountAttributes, formCountOptionalAttributes>;

export class formCount extends Model<formCountAttributes, formCountCreationAttributes> implements formCountAttributes {
  cntid!: number;
  hasFruit!: string;
  observation?: string;
  qty?: number;
  unitMeasurement?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof formCount {
    return formCount.init({
    cntid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    hasFruit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    observation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    unitMeasurement: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'formCount',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK_ff8aa193777b66dedd0ba3f79f1",
        unique: true,
        fields: [
          { name: "cntid" },
        ]
      },
    ]
  });
  }
}
