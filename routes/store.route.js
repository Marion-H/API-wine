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

store.put("/:uuid", async (req,res) => {
    const uuid = req.params.uuid
    const { name } = req.body
    try {
        const store = await Store.update({ name }, {where: { uuid }})
        if (store[0] !== 0){
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

module.exports = store