const { Sequelize, DataTypes } = require('sequelize');
/* eslint-disable no-undef */
const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`; // No error will be raised here
/* eslint-enable no-undef */

console.log(`connection string -${connectionString} `)
const sequelize = new Sequelize(
    connectionString,
    {
        logging: false
    }
);

sequelize
    .authenticate()
    .then(() => {
       
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

module.exports.sequelize = sequelize;
module.exports.DataTypes = DataTypes;
