const apiRouter = require('express').Router()
const apiController = require('../controllers/apiController')

const { prize, dish, faq } = apiController

// path: 'protocol://domain:port/api/...'
apiRouter.route('/prizes')
  .get(prize.getAllPrizes) // ?mode=random
  .post(prize.createPrize)

apiRouter.route('/prizes/:id')
  .get(prize.getPrize)
  .delete(prize.deletePrize)
  .patch(prize.updatePrize)

apiRouter.route('/dishes')
  .get(dish.getAllDishes)
  .post(dish.createDish)

apiRouter.route('/dishes/:id')
  .get(dish.getDish)
  .patch(dish.updateDish)
  .delete(dish.deleteDish)

apiRouter.route('/faqs')
  .get(faq.getAll)
  .post(faq.checkInput, faq.create)

apiRouter.route('/faqs/:id')
  .get(faq.get)
  .patch(faq.checkInput, faq.update)
  .delete(faq.delete)

apiRouter.all('*', (req, res) => res.json('no such api'))

module.exports = apiRouter
