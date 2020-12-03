const express = require("express")
const jwt = require("jsonwebtoken")

const login = express.Router()

const { SECRET } = process.env
const User = require("../models/User")

login.post("/", async (req, res) => {
    const { user, password } = req.body
    try {
        const userFind = await User.findOne({where : { user }})
        const isValide = userFind.validatePassword(password)
        if (isValide){
            const token = jwt.sign(
                {
                  uuid: userFind.dataValues.uuid,
                  user: userFind.dataValues.user,
                },
                SECRET,
                { expiresIn: "1h" }
              );
              const uuid = userFind.uuid;
              res.status(201).json({ token, uuid });
        }
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})

module.exports = login