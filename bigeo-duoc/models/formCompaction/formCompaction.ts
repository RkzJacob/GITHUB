import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface formCompactionAttributes {
  cptid: number;
  pressure: string;
  observation?: string;
}

export type formCompactionPk = "cptid";
export type formCompactionId = formCompaction[formCompactionPk];
export type formCompactionOptionalAttributes = "cptid" | "observation";
export type formCompactionCreationAttributes = Optional<formCompactionAttributes, formCompactionOptionalAttributes>;

export class formCompaction extends Model<formCompactionAttributes, formCompactionCreationAttributes> implements formCompactionAttributes {
  cptid!: number;
  pressure!: string;
  observation?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof formCompaction {
    return formCompaction.init({
    cptid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pressure: {
      type: DataTypes.STRING,
      allowNull: false
    },
    observation: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'formCompaction',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK_fa05da485c0e875c2dbff1cb717",
        unique: true,
        fields: [
          { name: "cptid" },
        ]
      },
    ]
  });
  }
}
