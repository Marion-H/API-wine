require("dotenv").config();
const sequelize = require("./sequelize");
(async () => {
  try{
      const { DB_NAME, DB_TEST } = process.env
    await sequelize.query(`DROP DATABASE ${DB_NAME}`);
    await sequelize.query(`CREATE DATABASE ${DB_NAME}`);
    await sequelize.query(`DROP DATABASE ${DB_TEST}`);
    await sequelize.query(`CREATE DATABASE ${DB_TEST}`);
    console.log("success")
    process.exit();
  }catch(err){
    console.log(err)
  }
})();