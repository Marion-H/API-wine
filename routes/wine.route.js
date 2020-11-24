const express = require("express")

const wine = express.Router()

const Wine = require("../models/Wine")

wine.get("/", async (req, res) => {
    try {
        const wines = await Wine.findAll()
        res.status(200).json(wines)
    } catch (err) {
        res.statut(400).json({
            status: "error",
            message: err.message
        })
    }
})

wine.get("/:uuid", async (req, res) => {
    const uuid = req.params.uuid
    try {
        const wine = await Wine.findByPk(uuid)
        res.status(200).json(wine)
    } catch (err) {
        res.status(422).json({
            status: "error",
            message: err.message
        })
    }
})

wine.post("/", async (req, res) => {
    const { title, type, image, temperature, region, description, list_dishes, logo, price_indicator } = req.body
    try {
        const wine = await Wine.create({
            title, type, image, temperature, region, description, list_dishes, logo, price_indicator
        })
        res.status(201).json(wine)
    } catch (err) {
        res.status(422).json({
            status: "error",
            message: err.message
        })
    }
})

wine.put("/:uuid", async (req, res) => {
    const uuid = req.params.uuid
    const { title, type, image, temperature, region, description, list_dishes, logo, price_indicator } = req.body
    try {
        const wine = await Wine.update({ title, type, image, temperature, region, description, list_dishes, logo, price_indicator }, { where: { uuid } })
        if (wine[0] !== 0 ){
            res.status(204).end()
        } else {
            res.status(422).json({
                status: "error",
                message: "Check if the key exists or if the key is well written"
            })
        }
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})

wine.delete("/:uuid", async (req, res) => {
    const uuid = req.params.uuid
    try {
        await Wine.destroy({where: {uuid}})
        res.status(204).end()
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})

module.exports = wine