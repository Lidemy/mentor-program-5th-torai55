const apiRouter = require('express').Router()
const apiController = require('../controllers/apiController')

// path: '/api/...'
apiRouter.route('/prizes')
  .get(apiController.prize.getAllPrizes) // ?mode=random
  .post(apiController.prize.createPrize)

apiRouter.route('/prizes/:id')
  .get(apiController.prize.getPrize)
  .delete(apiController.prize.deletePrize)
  .patch(apiController.prize.updatePrize)

apiRouter.route('/menu')

apiRouter.route('/faq')

apiRouter.get('*', (req, res) => res.send('in api router'))

module.exports = apiRouter
