"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
var init_mysql_1 = require("../helper/common/init_mysql");
var sequelize_1 = require("sequelize");
var Todo = init_mysql_1.sequelize.define('Todo', {
    // Model attributes are defined here
    taskName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true
});
exports.Todo = Todo;
