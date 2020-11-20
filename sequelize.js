require("dotenv").config()
const Sequelize = require("sequelize")

const { DB_USER, DB_PASSWORD,DB_NAME,DB_DIALECT, DB_HOST} = process.env

module.exports = new Sequelize({
    host: DB_HOST,
    username: DB_USER, 
    password: DB_PASSWORD,
    database: DB_NAME,
    dialect: DB_DIALECT,
    logging: false
})