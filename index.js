require("dotenv").config()
const express = require("express")
const cors = require("cors")
const helmet = require("helmet")

const sequelize = require("./sequelize")

const wine = require("./routes/wine.route")
const store = require("./routes/store.route")

const app = express()

const PORT = process.env.PORT || 8000

app.use(cors())

app.use(helmet())

app.use(express.json())

app.use("/wines", wine)
app.use("/stores", store)

app.get("/", (req, res) => {
    res.status(200).send("Welcome in your API")
})

async function main() {
    try {
        await sequelize.sync({force:true})
        await sequelize.authenticate()
        console.log("Database succesfully joined")
        app.listen(PORT, (err) => {
            if (err) throw new Error(err.message)
            console.log(`Server is running on http://localhost:${PORT}`)
        })
    } catch (err) {
        console.log("Unable to join database", err.message)
    }
}

if (process.env.NODE_ENV !== "test") {
    main();
}

module.exports = app