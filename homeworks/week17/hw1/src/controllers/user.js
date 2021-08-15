const bcrypt = require('bcrypt')
const userModel = require('../models/user')

const saltRounds = 10

module.exports = {
  signup: (req, res) => {
    const { username, password } = req.body

    if (!(username.trim() && password.trim())) {
      req.flash('errMsg', '帳號密碼不得為空白')
      return res.redirect('/signup')
    }

    bcrypt.hash(password, saltRounds)
      .then((hash) => {
        const userInfo = {
          username,
          password: hash
        }
        return userInfo
      }).then((userInfo) => {
        userModel.create(userInfo, (err, result) => {
          if (err) return res.send(`signup error: ${err}`)
          if (result?.affectedRows === 0) {
            req.flash('errMsg', '使用者名稱已被註冊')
            return res.redirect(302, '/signup')
          }
          req.session.username = username
          res.redirect(302, '/home')
        })
      }).catch((err) => console.log(`signup error: ${err}`))
  },

  login: (req, res) => {
    const { username, password } = req.body
    userModel.get(username, (err, result) => {
      if (err) console.log(`login error: ${err}`)
      if (result?.password === undefined) {
        req.flash('errMsg', '帳號或密碼錯誤')
        return res.redirect(302, '/login')
      }

      bcrypt.compare(password, result?.password)
        .then((result) => {
          if (result) {
            req.session.username = username
            return res.redirect(302, '/home')
          }
          req.flash('errMsg', '帳號或密碼錯誤')
          res.redirect(302, '/login')
        }).catch((err) => console.log(`login error: ${err}`))
    })
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) console.log(`logout error: ${err}`)
      res.redirect('/home')
    })
  }
}
