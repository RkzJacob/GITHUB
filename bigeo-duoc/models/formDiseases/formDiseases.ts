import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface formDiseasesAttributes {
  disid: number;
  diseases?: string;
  level?: string;
  observation?: string;
}

export type formDiseasesPk = "disid";
export type formDiseasesId = formDiseases[formDiseasesPk];
export type formDiseasesOptionalAttributes = "disid" | "diseases" | "level" | "observation";
export type formDiseasesCreationAttributes = Optional<formDiseasesAttributes, formDiseasesOptionalAttributes>;

export class formDiseases extends Model<formDiseasesAttributes, formDiseasesCreationAttributes> implements formDiseasesAttributes {
  disid!: number;
  diseases?: string;
  level?: string;
  observation?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof formDiseases {
    return formDiseases.init({
    disid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    diseases: {
      type: DataTypes.STRING,
      allowNull: true
    },
    level: {
      type: DataTypes.STRING,
      allowNull: true
    },
    observation: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'formDiseases',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "formDiseases_pkey",
        unique: true,
        fields: [
          { name: "disid" },
        ]
      },
    ]
  });
  }
}
