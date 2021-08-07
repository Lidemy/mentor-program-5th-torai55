const router = require('express').Router()
const apiController = require('./controllers/lottery')

// pages
router.get('/', (req, res) => res.redirect(302, '/frontend'))
router.get('/frontend', (req, res) => res.render('index'))
router.get('/backend', (req, res) => res.send('backend'))

// api
router.route('/lottery')
  .get(apiController.getAll) // /lottery?mode=random
  .post(apiController.post)

router.route('/lottery/:id')
  .get(apiController.get)
  .patch(apiController.patch)
  .delete(apiController.delete)

module.exports = router

// // test
// const queryInterface = require('./db').getQueryInterface()
// const { DataTypes } = require('sequelize')

// router.get('/test', (req, res) => {
//   queryInterface.addColumn('lottery_prizes', 'chance', {type: DataTypes.DOUBLE})
//   res.send('alter table')
// })
