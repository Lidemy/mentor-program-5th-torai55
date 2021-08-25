module.exports = {
  development: {
    username: process.env.RESTAURANT_DB_USERNAME,
    password: process.env.RESTAURANT_DB_PASSWORD,
    database: process.env.RESTAURANT_DB_NAME,
    host: process.env.RESTAURANT_DB_HOST,
    dialect: 'mysql'
  },
  test: {
    username: process.env.RESTAURANT_DB_USERNAME,
    password: process.env.RESTAURANT_DB_PASSWORD,
    database: process.env.RESTAURANT_DB_NAME,
    host: process.env.RESTAURANT_DB_HOST,
    dialect: 'mysql'
  },
  production: {
    username: process.env.RESTAURANT_DB_USERNAME,
    password: process.env.RESTAURANT_DB_PASSWORD,
    database: process.env.RESTAURANT_DB_NAME,
    host: process.env.RESTAURANT_DB_HOST,
    dialect: 'mysql'
  }
}
