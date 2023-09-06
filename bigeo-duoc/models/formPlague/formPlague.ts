import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface formPlagueAttributes {
  plid: number;
  plague?: string;
  level?: string;
  population?: string;
  observation?: string;
}

export type formPlaguePk = "plid";
export type formPlagueId = formPlague[formPlaguePk];
export type formPlagueOptionalAttributes = "plid" | "plague" | "level" | "population" | "observation";
export type formPlagueCreationAttributes = Optional<formPlagueAttributes, formPlagueOptionalAttributes>;

export class formPlague extends Model<formPlagueAttributes, formPlagueCreationAttributes> implements formPlagueAttributes {
  plid!: number;
  plague?: string;
  level?: string;
  population?: string;
  observation?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof formPlague {
    return formPlague.init({
    plid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    plague: {
      type: DataTypes.STRING,
      allowNull: true
    },
    level: {
      type: DataTypes.STRING,
      allowNull: true
    },
    population: {
      type: DataTypes.STRING,
      allowNull: true
    },
    observation: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'formPlague',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "formPlague_pkey",
        unique: true,
        fields: [
          { name: "plid" },
        ]
      },
    ]
  });
  }
}
