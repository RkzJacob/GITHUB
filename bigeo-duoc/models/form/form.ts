import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { task, taskId } from '../task/task';

export interface formAttributes {
  form_id: number;
  type: string;
  propertiesPropid: number;
  geometryGid: number;
  image?: string;
  status?: string;
  tree_id?: number;
  task_id?: number;
}

export type formPk = "form_id";
export type formId = form[formPk];
export type formOptionalAttributes = "form_id" | "image" | "status" | "tree_id" | "task_id";
export type formCreationAttributes = Optional<formAttributes, formOptionalAttributes>;

export class form extends Model<formAttributes, formCreationAttributes> implements formAttributes {
  form_id!: number;
  type!: string;
  propertiesPropid!: number;
  geometryGid!: number;
  image?: string;
  status?: string;
  tree_id?: number;
  task_id?: number;

  // form belongsTo task via task_id
  task!: task;
  getTask!: Sequelize.BelongsToGetAssociationMixin<task>;
  setTask!: Sequelize.BelongsToSetAssociationMixin<task, taskId>;
  createTask!: Sequelize.BelongsToCreateAssociationMixin<task>;

  static initModel(sequelize: Sequelize.Sequelize): typeof form {
    return form.init({
    form_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    propertiesPropid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    geometryGid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tree_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'task',
        key: 'task_id'
      }
    }
  }, {
    sequelize,
    tableName: 'form',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK_ed84d8e98178872eb4ce8a3ebe7",
        unique: true,
        fields: [
          { name: "form_id" },
        ]
      },
    ]
  });
  }
}
