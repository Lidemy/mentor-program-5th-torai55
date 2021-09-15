const { v4: uuidv4 } = require('uuid')
const blogModel = require('../models/blog')

module.exports = {
  home: (req, res, next) => {
    blogModel.getAll((err, result) => {
      if (err) return next(err)

      res.render('index', {
        posts: result,
        authKey: req.session.authKey
      })
    })
  },

  backend: (req, res, next) => {
    blogModel.getAll((err, result) => {
      if (err) return next(err)
      res.render('backend', {
        posts: result,
        authKey: req.session.authKey
      })
    })
  },

  edit: (req, res, next) => {
    const { id } = req.params
    const referer = req.get('referer')

    blogModel.get(id, (err, result) => {
      if (err) return next(err)
      res.render('edit', {
        post: result,
        referer,
        authKey: req.session.authKey
      })
    })
  },

  post: (req, res, next) => {
    const { id } = req.params

    blogModel.get(id, (err, result) => {
      if (err) return next(err)
      res.render('post', {
        post: result,
        authKey: req.session.authKey
      })
    })
  },

  addPost: (req, res) => {
    res.render('add_post', { authKey: req.session.authKey })
  },

  login: (req, res) => {
    if (req.session.username) return res.redirect(302, '/home')
    res.render('login')
  },

  signup: (req, res) => {
    res.render('signup')
  },

  createCsrfToken: (req, res, next) => {
    // 防 CSRF
    const authKey = uuidv4()
    req.session.authKey = authKey
    next()
  },

  authentication: (req, res, next) => {
    if (!req.session.username && req.session.username !== 0) return res.redirect('/login')
    next()
  }
}
