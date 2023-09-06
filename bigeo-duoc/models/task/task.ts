import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { form, formId } from '../form/form';

export interface taskAttributes {
  task_id: number;
  dateTime: string;
  status: string;
  assigned_user: string;
  observation?: string;
  assigned_form?: object;
  dateTimeLimit?: string;
  priority?: string;
}

export type taskPk = "task_id";
export type taskId = task[taskPk];
export type taskOptionalAttributes = "task_id" | "observation" | "assigned_form" | "dateTimeLimit" | "priority";
export type taskCreationAttributes = Optional<taskAttributes, taskOptionalAttributes>;

export class task extends Model<taskAttributes, taskCreationAttributes> implements taskAttributes {
  task_id!: number;
  dateTime!: string;
  status!: string;
  assigned_user!: string;
  observation?: string;
  assigned_form?: object;
  dateTimeLimit?: string;
  priority?: string;

  // task hasMany form via task_id
  forms!: form[];
  getForms!: Sequelize.HasManyGetAssociationsMixin<form>;
  setForms!: Sequelize.HasManySetAssociationsMixin<form, formId>;
  addForm!: Sequelize.HasManyAddAssociationMixin<form, formId>;
  addForms!: Sequelize.HasManyAddAssociationsMixin<form, formId>;
  createForm!: Sequelize.HasManyCreateAssociationMixin<form>;
  removeForm!: Sequelize.HasManyRemoveAssociationMixin<form, formId>;
  removeForms!: Sequelize.HasManyRemoveAssociationsMixin<form, formId>;
  hasForm!: Sequelize.HasManyHasAssociationMixin<form, formId>;
  hasForms!: Sequelize.HasManyHasAssociationsMixin<form, formId>;
  countForms!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof task {
    return task.init({
    task_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dateTime: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    assigned_user: {
      type: DataTypes.STRING,
      allowNull: false
    },
    observation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    assigned_form: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    dateTimeLimit: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'task',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "task_pkey",
        unique: true,
        fields: [
          { name: "task_id" },
        ]
      },
    ]
  });
  }
}
