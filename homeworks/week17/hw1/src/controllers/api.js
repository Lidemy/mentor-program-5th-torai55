const blogModel = require('../models/blog')

const authKey = ['lidemy_torai_api']

module.exports = {
  getAll: (req, res) => {
    blogModel.getAll((err, results) => {
      if (err) {
        console.log(err)
        return res.json('input error')
      }
      res.json(results)
    })
  },

  create: (req, res) => {
    blogModel.create(req.body, (err, result) => {
      if (err) {
        console.log(err)
        return res.json('input error')
      }
      res.json({ msg: 'success' }).redirect('back')
    })
  },

  delete: (req, res) => {
    const { id } = req.body
    blogModel.delete(id, (err, result) => {
      if (err) {
        console.log(err)
        return res.json('input error')
      }
      res.json({ msg: 'success' })
    })
  },

  update: (req, res) => {
    const post = req.body
    blogModel.update(post, (err, result) => {
      if (err) {
        console.log(err)
        return res.json('input error')
      }
      // res.send(result)
      res.json({ msg: 'success' })
    })
  },

  csrfAuth: (req, res, next) => {
    // 防 CSRF & 確認 api 權限
    const inputKey = req.body.authKey
    const validKeys = [...authKey, req.session.authKey]
    console.log(req.body)
    console.log(validKeys)
    console.log(inputKey)
    if (!validKeys.includes(inputKey)) return res.json('invalid authKey')
    next()
  }
}
