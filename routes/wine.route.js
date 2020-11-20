const express = require("express")

const wine = express.Router()

const Wine = require("../models/Wine")

wine.get("/", async (req, res) => {
    const wines = await Wine.findAll()
    try {
        res.status(200).json(wines)
    } catch (err) {
        res.statut(400).json(err)
    }
})

wine.post("/", async (req, res) => {
    const { title, type, image, temperature, region, description, ref_store, list_dishes, logo, price_indicator } = req.body
    try {
        const wine = await Wine.create({
            title, type, image, temperature, region, description, ref_store, list_dishes, logo, price_indicator
        })
        res.status(201).json(wine)
    } catch (err) {
        res.status(422).json({
            status: "error",
            message: err.message
        })
    }
})

module.exports = wine