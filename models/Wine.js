const Sequelize = require("sequelize")
const sequelizeInstance = require("../sequelize")

const Wine = sequelizeInstance.define(
    "Wine",
    {
        uuid: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        title: {
            type: Sequelize.STRING(400),
            allowNull: false,
        },
        type: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        image: {
            type: Sequelize.STRING(500),
            allowNull: false,
        },
        temperature: {
            type: Sequelize.FLOAT,
            allowNull: true,
        },
        region: {
            type: Sequelize.STRING(250),
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(1000),
            allowNull: true
        },
        list_dishes: {
            type: Sequelize.STRING,
            allowNull: false,
            get() {
                const rawValue = this.getDataValue("list_dishes")
                return rawValue? rawValue.split(';') : null
            },
            set(val) {
                this.setDataValue("list_dishes", val.join(";"))
            }
        },
        logo: {
            type: Sequelize.STRING,
            allowNull: false,
            get() {
                const rawValue = this.getDataValue("logo")
                return rawValue ? rawValue.split(';') : null
            },
            set(val) {
                this.setDataValue("logo", val.join(";"))
            }
        },
        price_indicator: {
            type: Sequelize.STRING(10),
            allowNull: false
        }, 
    }
);

module.exports = Wine