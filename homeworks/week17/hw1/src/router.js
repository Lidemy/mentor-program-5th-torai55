const router = require('express').Router()
const blogController = require('./controllers/blog')
const userController = require('./controllers/user')
const blogModel = require('./models/blog')
const apiRouter = require('./apiRoute')

// mount api router
router.use('/api', apiRouter)

// blog pages
router.get('/', (req, res) => res.redirect(301, '/home'))
router.get(['/home', '/home/*'], paginationMiddleware, blogController.createCsrfToken, blogController.home)
router.get('/backend', blogController.authentication, paginationMiddleware, blogController.createCsrfToken, blogController.backend)
router.get('/add_post', blogController.authentication, blogController.createCsrfToken, blogController.addPost)
router.get('/edit/:id', blogController.authentication, blogController.createCsrfToken, blogController.edit)
router.get('/posts/:id', blogController.authentication, blogController.createCsrfToken, blogController.post)
router.get('/login', blogController.login)
// router.get('/signup', blogController.signup)

// user actions
router.post('/login', userController.login)
router.get('/logout', userController.logout)
// router.post('/signup', userController.signup)

function paginationMiddleware(req, res, next) {
  blogModel.getAll((err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).end('server error')
    }
    const limit = 5
    const count = result.length
    const currentPage = Number(req.query.page) || 1
    const totalPages = Math.ceil(count / 5)
    const offset = (currentPage - 1) * limit

    res.locals.limit = limit
    res.locals.count = count
    res.locals.currentPage = currentPage
    res.locals.totalPages = totalPages
    res.locals.offset = offset

    next()
  })
}

module.exports = router
