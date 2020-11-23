const chai = require("chai")
const chaiHttp = require("chai-http")
const Wine = require("../models/Wine")

let expect = chai.expect

let server = require("../index")

const sequelize = require("../sequelize")

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
    "createdAt",
    "updatedAt"
]

let wine

describe("WINE", () => {
    before(async () => {
        await sequelize.sync({ force: true })
        wine = await Wine.create({
            title: "vin bordeaux",
            type: "rouge",
            image: "test.png",
            temperature: "12.3",
            region: "nouvelle-aquitaine",
            description: "lorem ipsum",
            list_dishes: ["poulet", "poisson"],
            logo: ["test.png", "test.png", "test.png"],
            price_indicator: "€-€€"
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
                    price_indicator: "€-€€"
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
                expect(res.body).have.keys(["status","message"])
            } catch (err) {
                throw err
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
    })
})