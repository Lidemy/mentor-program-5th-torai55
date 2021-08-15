const { ValidationError } = require('sequelize')
const ServerError = require('../error')
const lotteryModel = require('../models/lottery')

module.exports = {
  getAll: (req, res, next) => {
    const mode = req.query.mode || 'all' // value: random or all(default)

    lotteryModel.getAll()
      .then((prizes) => {
        if (mode === 'all') return res.json(prizes)
        let win
        const weightedTotal = prizes.reduce((accu, curr) => accu + curr.weight, 0)
        let random = Math.ceil(Math.random() * weightedTotal)
        for (let i = 0; i < prizes.length; i++) {
          random -= prizes[i].weight
          if (random <= 0) {
            win = prizes[i]
            break
          }
        }
        res.json(win)
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
    const { name, imageUrl, description, weight } = req.body
    console.log(req.body)

    lotteryModel.post({
      name,
      imageUrl,
      description,
      weight
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
    const { name, imageUrl, description, weight } = req.body
    lotteryModel.patch({
      id,
      name,
      imageUrl,
      description,
      weight
    }).then((result) => {
      console.log(result)
      res.json('patch success')
    })
      .catch((err) => {
        if (err instanceof ValidationError) {
          console.log(err)
          return res.status(400).json(`invalid input: ${err.message}`)
        }
        next(new ServerError(err.message))
      })
  },

  delete: (req, res, next) => {
    const { id } = req.params

    lotteryModel.delete(id)
      .then(() => res.json('delete success'))
      .catch((err) => {
        if (err instanceof ValidationError) {
          console.log(err)
          return res.status(400).json(`invalid input: ${err.message}`)
        }
        next(new ServerError(err.message))
      })
  }
}
