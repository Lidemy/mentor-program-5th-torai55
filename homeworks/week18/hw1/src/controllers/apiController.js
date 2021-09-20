const prizeController = require('./api/prizeController')
const dishController = require('./api/dishController')
const faqController = require('./api/faqController')
const userController = require('./api/userController')

const apiController = {
  prize: prizeController,
  dish: dishController,
  faq: faqController,
  user: userController
}

module.exports = apiController
