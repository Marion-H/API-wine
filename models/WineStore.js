const Sequelize = require("sequelize")
const sequelizeInstance = require("../sequelize")
const Wine = require("./Wine")
const Store = require("./Store")

const WineStore = sequelizeInstance.define(
    "WineStore",
    {},
    { timestamps: false }
)

module.exports = WineStore