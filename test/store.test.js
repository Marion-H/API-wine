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
        await sequelize.sync({ force: true})
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
})
