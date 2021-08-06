const router = require('express').Router()
const apiController = require('./controllers/lottery')

// pages
router.get('/', (req, res) => res.redirect(302, '/front'))
router.get('/front', (req, res) => res.render('index'))

// api
router.route('/lottery')
  .get(apiController.get)
  .post()
  .put()
  .delete()

module.exports = router
