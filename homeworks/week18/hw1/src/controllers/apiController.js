const prizeController = require('./api/prizeController')
const dishController = require('./api/dishController')
const faqController = require('./api/faqController')

const apiController = {
  prize: prizeController,
  dish: dishController,
  faq: faqController
}

module.exports = apiController
