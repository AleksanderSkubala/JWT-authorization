require('dotenv').config()

module.exports = {
  host: "remotemysql.com",
  user: process.env.DB_NAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}
