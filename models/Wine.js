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

// Wine.create({
//     title: "Baba",
//     type: "rouge",
//     image: "https://www.bienmanger.com/tinyMceData/images/categories/1423/valeur-sure-kressmann.jpg",
//     temperature: "15.2",
//     region:"nouvelle-aquitaine",
//     description: "lorem ipsum",
//     list_dishes: ["viande rouge", "poulet"],
//     logo: ["https://www.bienmanger.com/tinyMceData/images/categories/1423/valeur-sure-kressmann.jpg","https://www.bienmanger.com/tinyMceData/images/categories/1423/valeur-sure-kressmann.jpg"],
//     price_indicator: "€-€€"
// })

module.exports = Wine