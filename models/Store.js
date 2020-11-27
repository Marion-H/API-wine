const Sequelize = require("sequelize")
const SequelizeInstance = require("../sequelize")

const Store = SequelizeInstance.define(
    "Store",
    {
        uuid: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        name: {
            type: Sequelize.STRING(50),
            allowNull: false,
        }
    }
)


module.exports = Store