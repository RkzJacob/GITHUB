import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface formDamageAttributes {
  dmgid: number;
  damage: string;
  observation?: string;
}

export type formDamagePk = "dmgid";
export type formDamageId = formDamage[formDamagePk];
export type formDamageOptionalAttributes = "dmgid" | "observation";
export type formDamageCreationAttributes = Optional<formDamageAttributes, formDamageOptionalAttributes>;

export class formDamage extends Model<formDamageAttributes, formDamageCreationAttributes> implements formDamageAttributes {
  dmgid!: number;
  damage!: string;
  observation?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof formDamage {
    return formDamage.init({
    dmgid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    damage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    observation: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'formDamage',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK_964c18d9530eaf7e0468f2ec672",
        unique: true,
        fields: [
          { name: "dmgid" },
        ]
      },
    ]
  });
  }
}
