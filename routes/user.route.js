const express = require("express")

const userApp = express.Router()

const regExpIntegrityCheck = require("../middlewares/regexCheck");
const { uuidv4RegExp } = require("../middlewares/regexCheck");

const User = require("../models/User")

userApp.get("/", async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ["password"]
            }
        })
        res.status(200).json(users)
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})

userApp.get("/:uuid", regExpIntegrityCheck(uuidv4RegExp), async (req, res) => {
    const uuid = req.params.uuid
    try {
        const user = await User.findOne({
            attributes: {
                exclude: ["password"]
            }
        },
        { where: {uuid}})
        res.status(200).json(user)
    } catch (err) {
        res.status(422).json({
            status: "error",
            message: err.message
        })
    }
})

userApp.post("/", async (req, res) => {
    const { user, password } = req.body
    try {
        const userCreate = await User.findOrCreate({
            where: { user },
            defaults: { password },
          });
        res.status(201).end();
    } catch (err) {
        res.status(422).json({
            status: "error",
            message: err.message
        })
    }
})

module.exports = userApp