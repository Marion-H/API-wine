const express = require("express")

const store = express.Router()

const Store = require("../models/Store")

store.get("/", async (req,res) => {
    try {
        const stores = await Store.findAll()
        res.status(200).json(stores)
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})

store.get("/:uuid", async (req,res) => {
    const uuid = req.params.uuid
    try {
        const store = await Store.findByPk(uuid)
        res.status(200).json(store)
    } catch (err) {
        res.status(422).json({
            status: "error",
            message: err.message
        })
    }
})

module.exports = store