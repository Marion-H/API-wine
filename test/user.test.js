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
    "user",
    "createdAt",
    "updatedAt"
]

let user
let token


describe("USER", () => {
    before(async () => {
        await sequelize.sync({ force: true })

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

    describe("get all users", () => {
        it("should return an array of users", async () => {
            try {
                const res = await chai.request(server).get("/users")
                expect(res).have.status(200)
                expect(res.body).to.be.a("array")
                expect(res.body[0]).have.keys(userKey)
                expect(res.body).lengthOf(1)
            } catch (err) {
                throw err
            }
        })
    })

    describe("get one user", () => {
        it("should return an object user with uuid", async () => {
            try {
                const res = await chai.request(server).get(`/users/${user.uuid}`)
                expect(res).have.status(200)
                expect(res.body).to.be.a("object")
                expect(res.body).have.keys(userKey)
            } catch (err) {
                throw err
            }
        })

        it("failed to get one user", async () => {
            try {
                const res = await chai.request(server)
                .get('/users/1')
                expect(res).have.status(404)
                expect(res.body).to.be.a("object")
                expect(res.body).have.keys(["status", "message"])
            } catch (err) {
                throw err
            }
        })
    })

    describe("post a user", () => {
        it("should post a new user", async () => {
            try {
                const res = await chai.request(server)
                    .post('/users')
                    .set("Authorization", ` Bearer ${token}`)
                    .send({
                        user: "Biocoop",
                        password: "toto"
                    })
                expect(res).have.status(201)
            } catch (err) {
                throw err
            }
        })

        it("failed to create a new user", async () => {
            try {
                const res = await chai.request(server)
                    .post('/users')
                    .set("Authorization", ` Bearer ${token}`)
                    .send({
                        us: "Biocoop"
                    })
                expect(res).have.status(422)
                expect(res.body).to.be.a("object")
                expect(res.body).have.keys(["status", "message"])
            } catch (err) {
                throw err
            }
        })
    })

    describe("put a user", () => {
        it("should update a user", async () => {
            try {
                const res = await chai.request(server)
                .put(`/users/${user.uuid}`)
                .set("Authorization", ` Bearer ${token}`)
                .send({
                    user: "Biocoop1"
                })
                expect(res).have.status(204)
            } catch (err) {
                throw err
            }
        })

        it("failed to update a user", async () => {
            try {
                const res = await chai.request(server)
                .put(`/users/${user.uuid}`)
                .set("Authorization", ` Bearer ${token}`)
                .send({
                    us: "Biocoop1"
                })
                expect(res).have.status(404)
                expect(res.body).to.be.a("object")
                expect(res.body).have.keys(["status", "message"])
            } catch (err) {
                throw err
            }
        })
    })

    describe("delete a user with uuid", () => {
        it("should delete a single user with a uuid", async () => {
            try {
                const res = await chai.request(server)
                .delete(`/users/${user.uuid}`)
                .set("Authorization", ` Bearer ${token}`)
                expect(res).have.status(204)
            } catch (err) {
                throw err
            }
        })

        it("failed to delete user", async () => {
            try {
                const res = await chai.request(server)
                .delete('/users/1')
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