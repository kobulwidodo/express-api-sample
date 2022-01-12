const dbConfig = require('../config/db')
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
})

sequelize.authenticate()
.then(() => {
  console.log(`Connected`)
})
.catch(() => {
  console.log(`Error`)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.products = require('./productModel.js')(sequelize, DataTypes)
db.users = require('./userModel.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
.then(() => {
  console.log(`re-sync done`);
})

db.users.hasMany(db.products)
db.products.belongsTo(db.users)

module.exports = db
