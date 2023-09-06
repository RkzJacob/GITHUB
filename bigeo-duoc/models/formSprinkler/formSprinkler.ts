import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface formSprinklerAttributes {
  spid: number;
  spcode: string;
  defect: string;
  repaired: string;
  observation?: string;
}

export type formSprinklerPk = "spid";
export type formSprinklerId = formSprinkler[formSprinklerPk];
export type formSprinklerOptionalAttributes = "spid" | "observation";
export type formSprinklerCreationAttributes = Optional<formSprinklerAttributes, formSprinklerOptionalAttributes>;

export class formSprinkler extends Model<formSprinklerAttributes, formSprinklerCreationAttributes> implements formSprinklerAttributes {
  spid!: number;
  spcode!: string;
  defect!: string;
  repaired!: string;
  observation?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof formSprinkler {
    return formSprinkler.init({
    spid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    spcode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    defect: {
      type: DataTypes.STRING,
      allowNull: false
    },
    repaired: {
      type: DataTypes.STRING,
      allowNull: false
    },
    observation: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'formSprinkler',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK_9674a3a4314c98e29068930ee49",
        unique: true,
        fields: [
          { name: "spid" },
        ]
      },
    ]
  });
  }
}
