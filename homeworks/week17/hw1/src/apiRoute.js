const router = require('express').Router()
const apiController = require('./controllers/api')

router.get('/posts', apiController.getAll)
router.post('/posts', apiController.create)
router.delete('/posts', apiController.delete)
router.put('/posts', apiController.update)

module.exports = router
