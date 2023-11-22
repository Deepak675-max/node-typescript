import {Sequelize} from "sequelize";

const sequelize = new Sequelize(
    process.env.MYSQL_DB_NAME!,
    process.env.MYSQL_USER!,
    process.env.MYSQL_PASS!,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(() => {
    console.log('Database Connected Successfully!.');
}).catch((error: any) => {
    console.error('Unable to connect to the database: ', error);
});

export {sequelize};