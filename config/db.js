const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DATABASE: process.env.DATABASE,
  dialect: process.env.DIALECT,

  pool: {
    max: process.env.MAX,
    min: process.env.MIN,
    acquire: process.env.ACQUIRE,
    idle: process.env.IDLE
  }
}
