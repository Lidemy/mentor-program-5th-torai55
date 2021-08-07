const { ValidationError } = require('sequelize')
const ServerError = require('../error')
const lotteryModel = require('../models/lottery')

// 待辦
// chance 分配方式
// random 演算法
// CSRF token
// 後臺網頁

module.exports = {
  getAll: (req, res, next) => {
    const mode = req.query.mode || 'all' // value: random or all(default)

    lotteryModel.getAll()
      .then((prizes) => {
        if (mode === 'all') return res.json(prizes)
        const random = Math.floor(Math.random() * prizes.length)
        res.json(prizes[random].dataValues)
      })
      .catch((err) => {
        next(new ServerError(err.message)) // pass error to error handling middleware
      })
  },

  get: (req, res, next) => {
    const { id } = req.params

    lotteryModel.get(id)
      .then((prize) => res.json(prize))
      .catch((err) => {
        next(new ServerError(err.message))
      })
  },

  post: (req, res, next) => {
    const { name, imageUrl, description, chance } = req.body
    console.log(req.body)

    lotteryModel.post({
      name,
      imageUrl,
      description,
      chance
    }).then((prize) => res.json(prize)) // 成功就回傳
      .catch((err) => {
        if (err instanceof ValidationError) {
          console.log(err)
          return res.status(400).end(`invalid input: ${err.message}`)
        }
        next(new ServerError(err.message))
      })
  },

  patch: (req, res, next) => {
    const { id } = req.params
    const { name, imageUrl, description, chance } = req.body
    lotteryModel.patch({
      id,
      name,
      imageUrl,
      description,
      chance
    }).then((result) => {
      console.log(result)
      res.send('patch success')
    })
      .catch((err) => {
        if (err instanceof ValidationError) {
          console.log(err)
          return res.status(400).end(`invalid input: ${err.message}`)
        }
        next(new ServerError(err.message))
      })
  },

  delete: (req, res, next) => {
    const { id } = req.params

    lotteryModel.delete(id)
      .then(() => res.send('delete success'))
      .catch((err) => {
        if (err instanceof ValidationError) {
          console.log(err)
          return res.status(400).end(`invalid input: ${err.message}`)
        }
        next(new ServerError(err.message))
      })
  }
}
