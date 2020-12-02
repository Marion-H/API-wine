const Sequelize = require("sequelize")
const sequelizeInstance = require("../sequelize")
const bcrypt = require("bcrypt")

const User = sequelizeInstance.define(
    "User",
    {
        uuid: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        user: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        hooks: {
            beforeCreate: (user) => {
                if (user.password) {
                    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
                }
            },
        },
    }
)


User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = User