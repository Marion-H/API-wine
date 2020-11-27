const express = require("express")

const store = express.Router()

const regExpIntegrityCheck = require("../middlewares/regexCheck");
const { uuidv4RegExp } = require("../middlewares/regexCheck");

const Store = require("../models/Store")
const Wine = require("../models/Wine")

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

store.get("/:uuid", regExpIntegrityCheck(uuidv4RegExp), async (req,res) => {
    const uuid = req.params.uuid
    try {
        const store = await Store.findOne({
            where: { uuid }
        })
        if (store === null) {
            res.status(404).json({
                status: "error",
                message: " Store uuid not found"
            })
        } else {
            res.status(200).json(store)
        }
    } catch (err) {
        res.status(422).json({
            status: "error",
            message: err.message
        })
    }
})

store.post("/", async (req,res) => {
    const { name } = req.body
    try {
        const store = await Store.create({name})
        res.status(201).json(store)
    } catch (err) {
        res.status(422).json({
            status: "error",
            message: err.message
        })
    }
})

store.put("/:uuid", regExpIntegrityCheck(uuidv4RegExp), async (req,res) => {
    const uuid = req.params.uuid
    const { name } = req.body
    try {
        const store = await Store.update({ name }, {where: { uuid }})
        if (store[0] !== 0){
            res.status(204).end()
        } else {
            res.status(404).json({
                status: "error",
                message: "Store uuid or key not found"
            }) 
        }
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})

store.delete("/:uuid", regExpIntegrityCheck(uuidv4RegExp), async (req, res) => {
    const uuid = req.params.uuid
    try {
        await Store.destroy({where: {uuid} })
        res.status(204).end()
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})

module.exports = store