const express = require("express")

const wineStore = express.Router()

const WineStore = require("../models/WineStore")
const Wine = require("../models/Wine")
const Store = require("../models/Store")

wineStore.get("/", async (req, res) => {
    try {
        const wineStores = await WineStore.findAll()
        res.status(200).json(wineStores)
    } catch (err) {
        res.statut(400).json({
            status: "error",
            message: err.message
        })
    }
})

module.exports = wineStore