const express = require("express")
const jwt = require("jsonwebtoken")

const login = express.Router()

const { SECRET } = process.env
const User = require("../models/User")

login.post("/", async (req, res) => {
    const { user, password } = req.body
    try {
        const userFind = await User.findOne({where : { user }})
        if ( userFind !== null ){

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
                    res.status(200).json({ token, uuid });
                } else {
                    res.status(401).json({
                        status: "error",
                        message: "Password is not good"
                    })
                }
        } else {
            res.status(404).json({
                status: "error",
                message: "User not found"
            })
        }
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})

module.exports = login