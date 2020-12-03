const chai = require("chai")
const chaiHttp = require("chai-http")
const jwt = require("jsonwebtoken")

const Store = require("../models/Store")
const User = require("../models/User")

const { SECRET } = process.env

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
let token
let admin

describe("STORE", () => {
    before(async () => {
        await sequelize.sync({ force: true })

        admin = await User.create({
            user: "Biocoop",
            password: "toto"
        })

        token = jwt.sign(
            {
                uuid: admin.dataValues.uuid,
                user: admin.dataValues.user
            },
            SECRET,
            { expiresIn: "1h" }
        )

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
                const res = await chai.request(server)
                .post('/stores')
                .set("Authorization", ` Bearer ${token}`)
                .send({
                    name: "Juillan"
                })
                expect(res).have.status(201)
            } catch (err) {
                throw err
            }
        })

        it("failed to create a new store", async () => {
            try {
                const res = await chai.request(server)
                .post('/stores')
                .set("Authorization", ` Bearer ${token}`)
                .send({
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
                const res = await chai.request(server)
                .put(`/stores/${store.uuid}`)
                .set("Authorization", ` Bearer ${token}`)
                .send({
                    name: "Juillan"
                })
                expect(res).have.status(204)
            } catch (err) {
                throw err
            }
        })

        it("failed to update a store", async () => {
            try {
                const res = await chai.request(server)
                .put(`/stores/${store.uuid}`)
                .set("Authorization", ` Bearer ${token}`)
                .send({
                    nam: "Juillan"
                })
                expect(res).have.status(404)
                expect(res.body).to.be.a("object")
                expect(res.body).have.keys(["status", "message"])
            } catch (err) {
                throw err
            }
        })
    })

    describe("delete a store", () => {
        it("should delete a single store with uuid", async () => {
            try {
                const res = await chai.request(server)
                .delete(`/stores/${store.uuid}`)
                .set("Authorization", ` Bearer ${token}`)
                expect(res).have.status(204)
            } catch (err) {
                throw err
            }
        })

        it("failed to delete store", async () => {
            try {
                const res = await chai.request(server)
                .delete('/stores/1')
                .set("Authorization", ` Bearer ${token}`)
                expect(res).have.status(404)
                expect(res.body).to.be.a("object")
                expect(res.body).have.keys(["status", "message"])
            } catch (err) {
                throw err
            }
        })
    })
})
