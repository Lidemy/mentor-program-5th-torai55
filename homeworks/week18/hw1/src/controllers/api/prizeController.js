const db = require('../../models')

const prizeModel = db.Prize

const prizeController = {
  getAllPrizes: async(req, res, next) => {
    const mode = req.query.mode || 'all'
    try {
      const prizes = await prizeModel.findAll({
        where: {
          isDeleted: 0
        }
      })
      if (mode !== 'random') return res.json(prizes)
      const total = prizes.reduce((accu, curr) => accu + curr.weight, 0)
      let random = Math.floor(Math.random() * total)
      let win
      for (const prize of prizes) {
        random -= prize.weight
        if (random <= 0) {
          win = prize
          break
        }
      }
      res.json(win)
    } catch (err) {
      next(err)
    }
  },

  getPrize: async(req, res, next) => {
    const { id } = req.params
    try {
      const prize = await prizeModel.findOne({
        where: {
          id,
          isDeleted: 0
        }
      })
      res.json(prize)
    } catch (err) {
      next(err)
    }
  },

  createPrize: async(req, res, next) => {
    const { name = '', imageUrl, description, weight } = req.body
    if (name !== 0 && !name) return res.status(400).json('name 必填')
    try {
      const newPrize = await prizeModel.create({
        name,
        imageUrl,
        description,
        weight
      }, {
        fields: ['name', 'imageUrl', 'description', 'weight']
      })
      res.json(newPrize)
    } catch (err) {
      next(err)
    }
  },

  deletePrize: async(req, res, next) => {
    const { id } = req.params
    try {
      const result = await prizeModel.update({
        isDeleted: 1
      }, {
        where: {
          id,
          isDeleted: 0
        }
      })
      if (!result[0]) return res.json(`id: ${id} not found`)
      res.json(`id: ${id} is deleted`)
    } catch (err) {
      next(err)
    }
  },

  updatePrize: async(req, res, next) => {
    const { id } = req.params
    const { name, imageUrl, description, weight } = req.body
    if (!name && name !== 0) return res.status(400).json('name 必填')
    try {
      const result = await prizeModel.update({
        name,
        imageUrl,
        description,
        weight
      }, {
        where: {
          id,
          isDeleted: 0
        }
      })
      if (!result[0]) return res.json(`id: ${id} not found`)
      const prize = await prizeModel.findOne({
        where: {
          id,
          isDeleted: 0
        }
      })
      res.json(prize)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = prizeController
