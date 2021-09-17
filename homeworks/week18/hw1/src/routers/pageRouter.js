const pageRouter = require('express').Router()
const restaurantController = require('../controllers/restaurantController')

// path: '/restaurant/...'
pageRouter.get('/', restaurantController.home)
pageRouter.get('/faq', restaurantController.faq)
pageRouter.get('/lottery', restaurantController.lottery)
pageRouter.get('/menu', restaurantController.menu)
pageRouter.get('/backend', restaurantController.backend)
pageRouter.get('/cart', restaurantController.cart)

// default route
pageRouter.get('*', (req, res) => res.redirect(301, '/restaurant'))

module.exports = pageRouter
