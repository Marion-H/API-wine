const chai = require("chai")
const chaiHttp = require("chai-http")
const Wine = require("../models/Wine")

let expect = chai.expect

const server = require("../index")

const sequelize = require("../sequelize")
const Store = require("../models/Store")

chai.use(chaiHttp)

const wineKey = [
    "uuid",
    "title",
    "type",
    "image",
    "temperature",
    "region",
    "description",
    "list_dishes",
    "logo",
    "price_indicator",
    "stores",
    "createdAt",
    "updatedAt"
]

const storeKey = [
    "uuid",
    "name",
    "createdAt",
    "updatedAt"
]

let wine
let store

describe("WINE", () => {
    before(async () => {
        await sequelize.sync({ force: true })

        store = await Store.create({
            name: "Juillan"
        })

        wine = await Wine.create({
            title: "vin bordeaux",
            type: "rouge",
            image: "test.png",
            temperature: "12.3",
            region: "nouvelle-aquitaine",
            description: "lorem ipsum",
            list_dishes: ["poulet", "poisson"],
            logo: ["test.png", "test.png", "test.png"],
            price_indicator: "€-€€",
            StoreUuid: [store.uuid]
        })

    })

    describe("get all wines", () => {
        it("should return an array of wines", async () => {
            try {
                const res = await chai.request(server).get("/wines")
                expect(res).have.status(200)
                expect(res.body).to.be.a("array")
                expect(res.body[0]).have.keys(wineKey)
                expect(res.body).lengthOf(1)
            } catch (err) {
                throw err
            }
        })
    })

    describe("get a wine with uuid", () => {
        it("should return an object of wine with uuid", async () => {
            try {
                const res = await chai.request(server).get(`/wines/${wine.uuid}`)
                expect(res).have.status(200)
                expect(res.body).to.be.a("object")
                expect(res.body).have.keys(wineKey)
            } catch (err) {
                throw err
            }
        })
    })

    describe("post a new wine", () => {
        it("should return a new object wine", async () => {
            try {
                const res = await chai.request(server).post("/wines").send({
                    title: "vin bordeaux",
                    type: "rouge",
                    image: "test.png",
                    temperature: "12.3",
                    region: "nouvelle-aquitaine",
                    description: "lorem ipsum",
                    list_dishes: ["poulet", "poisson"],
                    logo: ["test.png", "test.png", "test.png"],
                    price_indicator: "€-€€",
                    StoreUuid: [store.uuid]

                })
                expect(res).have.status(201)
            } catch (err) {
                throw err
            }
        })
        it("failed to create a new wine", async () => {
            try {
                const res = await chai.request(server).post("/wines").send({
                    title: "vin bordeaux"
                })
                expect(res).have.status(422)
                expect(res.body).to.be.a("object")
                expect(res.body).have.keys(["status", "message"])
            } catch (err) {
                throw err
            }
        })

        it("failled to create a new wine with a wrong format uuid store", async () => {
            try {
                const res = await chai.request(server).post("/wines").send({
                    title: "vin bordeaux",
                    type: "rouge",
                    image: "test.png",
                    temperature: "12.3",
                    region: "nouvelle-aquitaine",
                    description: "lorem ipsum",
                    list_dishes: ["poulet", "poisson"],
                    logo: ["test.png", "test.png", "test.png"],
                    price_indicator: "€-€€",
                    StoreUuid: ["d1304d85-5c75-46e7-ae00-42219ddf8bc"]
                })
                expect(res).have.status(422)
                expect(res.body).to.be.a("object")
                expect(res.body).have.keys(["status", "message"])
            } catch (err) {
                
            }
        })

        it("failled to create a new wine with store uuid null", async () => {
            try {
                const res = await chai.request(server).post("/wines").send({
                    title: "vin bordeaux",
                    type: "rouge",
                    image: "test.png",
                    temperature: "12.3",
                    region: "nouvelle-aquitaine",
                    description: "lorem ipsum",
                    list_dishes: ["poulet", "poisson"],
                    logo: ["test.png", "test.png", "test.png"],
                    price_indicator: "€-€€",
                    StoreUuid: ["d1304d85-5c75-46e7-ae00-42219ddf8bca"]
                })
                expect(res).have.status(404)
                expect(res.body).to.be.a("object")
                expect(res.body).have.keys(["status", "message"])
            } catch (err) {
                
            }
        })
    })

    describe("put a wine with uuid", () => {
        it("should put a wine with uuid", async () => {
            try {
                const res = await chai.request(server).put(`/wines/${wine.uuid}`).send({ title: "test" })
                expect(res).have.status(204)
            } catch (err) {
                throw err
            }
        })

        it("failed to put wine", async () => {
            try {
                const res = await chai.request(server).put(`/wines/${wine.uuid}`).send({ tit: "test" })
                expect(res).have.status(422)
                expect(res.body).to.be.a("object")
                expect(res.body).have.keys(["status", "message"])
            } catch (err) {

            }
        })
    })

    describe("delete a wine with uuid", () => {
        it("should delete a single wine with a uuid", async () => {
            try {
                const res = await chai.request(server).delete(`/wines/${wine.uuid}`)
                expect(res).have.status(204)
            } catch (err) {
                throw err
            }
        })

        it("failed to delete wine", async () => {
            try {
                const res = await chai.request(server).delete('/wines/1')
                expect(res).have.status(404)
                expect(res.body).to.be.a("object")
                expect(res.body).have.keys(["status", "message"])
            } catch (err) {
                throw err
            }
        })
    })
})