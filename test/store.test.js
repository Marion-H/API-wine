const chai = require("chai")
const chaiHttp = require("chai-http")
const Store = require("../models/Store")

let expect = chai.expect

const server = require("../index")

const sequelize = require("../sequelize")

chai.use(chaiHttp)

const storeKey = [
    "uuid",
    "name",
    "createdAt",
    "updatedAt"
]

let store

describe("STORE", () => {
    before(async () => {
        await sequelize.sync({ force: true })
        store = await Store.create({
            name: "Tarbes"
        })
    })

    describe("get all stores", () => {
        it("should return an array of stores", async () => {
            try {
                const res = await chai.request(server).get("/stores")
                expect(res).have.status(200)
                expect(res.body).to.be.a("array")
                expect(res.body[0]).have.keys(storeKey)
                expect(res.body).lengthOf(1)
            } catch (err) {
                throw err
            }
        })
    })

    describe("get one store", () => {
        it("should return an object store with uuid", async () => {
            try {
                const res = await chai.request(server).get(`/stores/${store.uuid}`)
                expect(res).have.status(200)
                expect(res.body).to.be.a("object")
                expect(res.body).have.keys(storeKey)
            } catch (err) {
                throw err
            }
        })
    })

    describe("post a store", () => {
        it("should post a new store", async () => {
            try {
                const res = await chai.request(server).post('/stores').send({
                    name: "Juillan"
                })
                expect(res).have.status(201)
            } catch (err) {
                throw err
            }
        })

        it("failed to create a new store", async () => {
            try {
                const res = await chai.request(server).post('/stores').send({
                    nam: "Juillan"
                })
                expect(res).have.status(422)
                expect(res.body).to.be.a("object")
                expect(res.body).have.keys(["status", "message"])
            } catch (err) {
                throw err
            }
        })
    })

    describe("put a store", () => {
        it("should update a store", async () => {
            try {
                const res = await chai.request(server).put(`/stores/${store.uuid}`).send({
                    name: "Juillan"
                })
                expect(res).have.status(204)
            } catch (err) {
                throw err
            }
        })

        it("failed to update a store", async () => {
            try {
                const res = await chai.request(server).put(`/stores/${store.uuid}`).send({
                    nam: "Juillan"
                })
                expect(res).have.status(422)
                expect(res.body).to.be.a("object")
                expect(res.body).have.keys(["status", "message"])
            } catch (err) {
                throw err
            }
        })
    })
})
