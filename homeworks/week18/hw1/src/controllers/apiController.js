const prizeController = require('./prizeController')
const dishController = require('./dishController')

const apiController = {
  prize: prizeController,
  dish: dishController
}

module.exports = apiController
