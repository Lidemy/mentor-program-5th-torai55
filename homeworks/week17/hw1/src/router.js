const router = require('express').Router()
const blogController = require('./controllers/blog')
const userController = require('./controllers/user')
const apiRouter = require('./apiRoute')

// mount api router
router.use('/api', apiRouter)

// blog pages
router.get('/', (req, res) => res.redirect(301, '/home'))
router.get(['/home', '/home/*'], blogController.home)
router.get('/backend', blogController.backend)
router.get('/add_post', blogController.addPost)
router.get('/edit/:id', blogController.edit)
router.get('/posts/:id', blogController.post)
router.get('/login', blogController.login)
router.get('/signup', blogController.signup)

// user actions
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.post('/signup', userController.signup)

module.exports = router
