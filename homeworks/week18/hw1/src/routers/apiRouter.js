const apiRouter = require('express').Router()
const apiController = require('../controllers/apiController')

// path: 'protocol://domain:port/api/...'
apiRouter.route('/prizes')
  .get(apiController.prize.getAllPrizes) // ?mode=random
  .post(apiController.prize.createPrize)

apiRouter.route('/prizes/:id')
  .get(apiController.prize.getPrize)
  .delete(apiController.prize.deletePrize)
  .patch(apiController.prize.updatePrize)

apiRouter.route('/dishes')
  .get(apiController.dish.getAllDishes)
  .post(apiController.dish.createDish)

apiRouter.route('/dishes/:id')
  .get(apiController.dish.getDish)
  .patch(apiController.dish.updateDish)
  .delete(apiController.dish.deleteDish)

apiRouter.route('/faq')

apiRouter.all('*', (req, res) => res.send('in api router'))

module.exports = apiRouter
