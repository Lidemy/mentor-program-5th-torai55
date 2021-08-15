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
    // 防 CSRF & 確認 api 權限
    const inputKey = req.body.authKey
    const validKeys = [...authKey, req.body.authKey]
    if (!validKeys.includes(inputKey)) return res.json('invalid authKey')

    blogModel.create(req.body, (err, result) => {
      if (err) {
        console.log(err)
        return res.json('input error')
      }
      res.json('success')
    })
  },

  delete: (req, res) => {
    // 防 CSRF & 確認 api 權限
    const inputKey = req.body.authKey.trim()
    const validKeys = [...authKey, req.session.authKey]
    if (!validKeys.includes(inputKey)) return res.json('invalid authKey')

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
    // 防 CSRF & 確認 api 權限
    const inputKey = req.body.authKey
    const validKeys = [...authKey, req.body.authKey]
    if (!validKeys.includes(inputKey)) return res.json('invalid authKey')

    const post = req.body
    blogModel.update(post, (err, result) => {
      if (err) {
        console.log(err)
        return res.json('input error')
      }
      // res.send(result)
      res.json({ msg: 'success' })
    })
  }
}
