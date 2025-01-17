const express = require("express")

const wine = express.Router()

const asyncHandler = require('express-async-handler')

const regExpIntegrityCheck = require("../middlewares/regexCheck");
const { uuidv4RegExp } = require("../middlewares/regexCheck");
const createWineStore = require("../middlewares/createWineStore")
const auth = require("../middlewares/auth")

const Wine = require("../models/Wine")
const Store = require("../models/Store")
const WineStore = require("../models/WineStore")

wine.get("/", async (req, res) => {
    try {
        const wines = await Wine.findAll({
            include: [{
                model: Store,
                as: "stores",
                required: false,
                attributes: ["uuid", "name"],
                through: {
                    model: WineStore,
                    as: "wineStores",
                    attributes: []
                }
            }]
        })
        res.status(200).json(wines)
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})

wine.get("/:uuid", regExpIntegrityCheck(uuidv4RegExp), async (req, res) => {
    const uuid = req.params.uuid
    try {
        const wine = await Wine.findOne({
            where: { uuid },
            include: [{
                model: Store,
                as: "stores",
                required: false,
                attributes: ["uuid", "name"],
                through: {
                    model: WineStore,
                    as: "wineStores",
                    attributes: []
                }
            }]
        })
        if (wine === null) {
            res.status(404).json({
                status: "error",
                message: " Wine uuid not found"
            })
        } else {
            res.status(200).json(wine)
        }
    } catch (err) {
        res.status(422).json({
            status: "error",
            message: err.message
        })
    }
})

wine.post("/", auth, asyncHandler(async (req, res) => {
    const { title, type, image, temperature, region, description, list_dishes, logo, price_indicator, StoreUuid } = req.body
    try {
        const saveWine = await Wine.create({
            title, type, image, temperature, region, description, list_dishes, logo, price_indicator
        })
        const test = await StoreUuid.forEach(async (uuid) => {
            const reg = uuidv4RegExp.test(uuid)
            if (reg) {
                const store = await Store.findByPk(uuid)
                await createWineStore(store, saveWine, res)
            } else {
                res.status(422).json({
                    status: "error",
                    message: "store uuid : wrong format"
                })
            }
        })
        res.status(201).json(saveWine)

    } catch (err) {
        res.status(422).json({
            status: "error",
            message: err
        })
    }
}))

wine.put("/:uuid", auth, regExpIntegrityCheck(uuidv4RegExp), async (req, res) => {
    const uuid = req.params.uuid
    const { title, type, image, temperature, region, description, list_dishes, logo, price_indicator } = req.body
    try {
        const wine = await Wine.update({ title, type, image, temperature, region, description, list_dishes, logo, price_indicator }, { where: { uuid } })
        if (wine[0] !== 0) {
            res.status(204).end()
        } else {
            res.status(404).json({
                status: "error",
                message: "Wine uuid or key not found"
            })
        }
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})

wine.delete("/:uuid", auth, regExpIntegrityCheck(uuidv4RegExp), async (req, res) => {
    const uuid = req.params.uuid
    try {
        const deleteWine = await Wine.destroy({ where: { uuid } })
        if (deleteWine !== 0) {
            res.status(204).end()
        } else {
            res.status(404).json({
                status: "error",
                message: "Wine uuid not found"
            })
        }
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})

module.exports = wine