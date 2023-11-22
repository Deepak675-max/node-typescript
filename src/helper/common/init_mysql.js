"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
var sequelize_1 = require("sequelize");
var sequelize = new sequelize_1.Sequelize(process.env.MYSQL_DB_NAME, process.env.MYSQL_USER, process.env.MYSQL_PASS, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql'
});
exports.sequelize = sequelize;
sequelize.authenticate().then(function () {
    console.log('Database Connected Successfully!.');
}).catch(function (error) {
    console.error('Unable to connect to the database: ', error);
});
