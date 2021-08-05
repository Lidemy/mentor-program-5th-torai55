const { v4: uuidv4 } = require('uuid')
const blogModel = require('../models/blog')

module.exports = {
  home: (req, res) => {
    // 防 CSRF
    const authKey = uuidv4()
    req.session.authKey = authKey

    blogModel.getAll((err, result) => {
      if (err) console.log(err)
      res.render('index', {
        posts: result,
        authKey
      })
    })
  },

  backend: (req, res) => {
    // 防 CSRF
    const authKey = uuidv4()
    req.session.authKey = authKey

    blogModel.getAll((err, result) => {
      if (err) console.log(err)
      res.render('backend', {
        posts: result,
        authKey
      })
    })
  },

  edit: (req, res) => {
    const { id } = req.params
    const referer = req.get('referer')

    blogModel.get(id, (err, result) => {
      if (err) console.log(err)
      res.render('edit', {
        post: result,
        referer
      })
    })
  },

  post: (req, res) => {
    // 防 CSRF
    const authKey = uuidv4()
    req.session.authKey = authKey
    const { id } = req.params

    blogModel.get(id, (err, result) => {
      if (err) console.log(err)
      res.render('post', {
        post: result,
        authKey
      })
    })
  },

  addPost: (req, res) => {
    res.render('add_post')
  },

  login: (req, res) => {
    if (req.session.username) return res.redirect(302, '/home')
    res.render('login')
  },

  signup: (req, res) => {
    res.render('signup')
  }
}
