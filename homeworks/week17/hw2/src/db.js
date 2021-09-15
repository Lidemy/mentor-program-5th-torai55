const { Sequelize } = require('sequelize')

const DATABASE = process.env.DB_DATABASE
const USERNAME = process.env.DB_USERNAME
const PASSWORD = process.env.DB_PASSWORD
const HOST = process.env.DB_HOST || 'localhost'
const DIALECT = process.env.DB_DIALECT || 'mysql'
const PORT = process.env.DB_PORT || 3306
const TIMEZONE = process.env.DB_TIMEZONE || '+08:00'
// const charset = 'utf8mb4'

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
  port: PORT,
  timezone: TIMEZONE
})

module.exports = sequelize
