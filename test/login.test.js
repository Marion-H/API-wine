const chai = require("chai")
const chaiHttp = require("chai-http")
const jwt = require("jsonwebtoken")

const User = require("../models/User")

const { SECRET } = process.env

let expect = chai.expect

const server = require("../index")

const sequelize = require("../sequelize")

chai.use(chaiHttp)

const userKey = [
    "uuid",
    "token"
]

let user
let token

describe("LOGIN", () => {
    before(async () => {
        await sequelize.sync({ force: true})

        user = await User.create({
            user: "Biocoop",
            password: "toto"
        })

        token = jwt.sign(
            {
                uuid: user.dataValues.uuid,
                user: user.dataValues.user
            },
            SECRET,
            { expiresIn: "1h" }
        )

    })

    describe("post an user and receive a token", () => {
        it("should return an objet with uuid and token", async () => {
            try {
                const res = await chai.request(server)
                .post("/login")
                .send({
                    user: "Biocoop",
                    password: "toto"
                })
                expect(res).have.status(200)
                expect(res.body).to.be.a("object")
                expect(res.body).have.keys(userKey)
            } catch (err) {
                throw err
            }
        })
        
        it("failed to generate token with wrong user", async() => {
            try {
                const res = await chai.request(server)
                .post("/login")
                .send({
                    user: "Biocoop1",
                    password: "toto"
                })
                expect(res).have.status(404)
                expect(res.body).to.be.a("object")
                expect(res.body).have.keys(["status", "message"])
            } catch (err) {
                throw err
            }
        })

        it("failed to generate token with wrong password", async() => {
            try {
                const res = await chai.request(server)
                .post("/login")
                .send({
                    user: "Biocoop",
                    password: "toto1"
                })
                expect(res).have.status(401)
                expect(res.body).to.be.a("object")
                expect(res.body).have.keys(["status", "message"])
            } catch (err) {
                throw err
            }
        })
    })
})