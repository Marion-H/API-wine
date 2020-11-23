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
        // ref_store: {
        //     type: Sequelize.STRING,
        //     allowNull: false,
        //     get() {
        //         return this.getDataValue("ref_store").split(';')
        //     },
        //     set(val) {
        //         this.setDataValue("ref_store", val.join(";"))
        //     }
        // }, 
        list_dishes: {
            type: Sequelize.STRING,
            allowNull: false,
            get() {
                return this.getDataValue("list_dishes").split(';')
            },
            set(val) {
                this.setDataValue("list_dishes", val.join(";"))
            }
        },
        logo: {
            type: Sequelize.STRING,
            allowNull: false,
            get() {
                return this.getDataValue("logo").split(';')
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