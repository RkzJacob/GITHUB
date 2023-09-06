import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface trackAttributes {
  id: number;
  type: string;
  userId: string;
  dateTime: Date;
  geometryGid: number;
  timeElapsed?: string;
  distance?: number;
  rawData?: object[];
}

export type trackPk = "id";
export type trackId = track[trackPk];
export type trackOptionalAttributes = "id" | "timeElapsed" | "distance" | "rawData";
export type trackCreationAttributes = Optional<trackAttributes, trackOptionalAttributes>;

export class track extends Model<trackAttributes, trackCreationAttributes> implements trackAttributes {
  id!: number;
  type!: string;
  userId!: string;
  dateTime!: Date;
  geometryGid!: number;
  timeElapsed?: string;
  distance?: number;
  rawData?: object[];


  static initModel(sequelize: Sequelize.Sequelize): typeof track {
    return track.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    geometryGid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    timeElapsed: {
      type: DataTypes.STRING,
      allowNull: true
    },
    distance: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    rawData: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'track',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK_0631b9bcf521f8fab3a15f2c37e",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
