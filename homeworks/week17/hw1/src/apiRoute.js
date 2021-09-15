const router = require('express').Router()
const apiController = require('./controllers/api')

router.get('/posts', apiController.getAll)
router.post('/posts', apiController.csrfAuth, apiController.create)
router.delete('/posts', apiController.csrfAuth, apiController.delete)
router.put('/posts', apiController.csrfAuth, apiController.update)

module.exports = router
