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

module.exports = store