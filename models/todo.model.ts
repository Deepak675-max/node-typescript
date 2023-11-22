import { todo } from "node:test";
import {sequelize} from "../helper/common/init_mysql";

import {DataTypes, Model} from "sequelize";
import { todoType } from "../helper/types/todo.type";

const Todo = sequelize.define<Model<any, any>>('Todo', {
    // Model attributes are defined here
    taskName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true
});

export  {Todo};