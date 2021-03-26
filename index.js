require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const sequelize = require("./sequelize");
require("./associations/associations");

const User = require("./models/User");

const wine = require("./routes/wine.route");
const store = require("./routes/store.route");
const wineStore = require("./routes/wineStore.route");
const user = require("./routes/user.route");
const login = require("./routes/login.route");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use("/wines", wine);
app.use("/stores", store);
app.use("/wineStores", wineStore);
app.use("/users", user);
app.use("/login", login);

app.get("/", (req, res) => {
  res.status(200).send("Welcome in your API");
});

if (process.env.DATABASE_URL) {
  const { Client } = require("pg");

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  client.connect();
} else {
  async function main() {
    try {
      await sequelize.sync();
      await sequelize.authenticate();
      await User.findCreateFind({
        where: { user: "Biocoop", password: "toto" },
      });
      console.log("Database succesfully joined");
      app.listen(PORT, (err) => {
        if (err) throw new Error(err.message);
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    } catch (err) {
      console.log("Unable to join database", err.message);
    }
  }
}

if (process.env.NODE_ENV !== "test") {
  main();
}

module.exports = app;
