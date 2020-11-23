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
})