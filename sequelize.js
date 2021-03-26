require("dotenv").config()
const Sequelize = require("sequelize")

const { DB_USER, DB_PASSWORD,DB_NAME,DB_DIALECT, DB_HOST, DB_TEST, NODE_ENV} = process.env

if (process.env.DATABASE_URL) {
  module.exports = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
  })
} else {

module.exports = new Sequelize({
    host: DB_HOST,
    username: DB_USER, 
    password: DB_PASSWORD,
    database: NODE_ENV !== "test" ? DB_NAME : DB_TEST,
    dialect: DB_DIALECT,
    logging: false
})
}
