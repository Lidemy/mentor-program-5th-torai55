const menuModel = require('../../models').Dish

const dishController = {
  getDish: async(req, res, next) => {
    const { id } = req.params
    try {
      const dish = await menuModel.findOne({
        where: {
          id,
          isDeleted: 0
        }
      })
      res.json(dish)
    } catch (err) {
      next(err)
    }
  },

  getAllDishes: async(req, res, next) => {
    try {
      const dishes = await menuModel.findAll({
        where: {
          isDeleted: 0
        }
      })
      res.json(dishes)
    } catch (err) {
      next(err)
    }
  },

  createDish: async(req, res, next) => {
    const { name, price, imageUrl } = req.body
    console.log(req.body)
    if (name !== 0 && !name) return res.status(400).json('name 必填')
    if (price !== 0 && !price) return res.status(400).json('price 必填')
    try {
      const newDish = await menuModel.create({
        name,
        price,
        imageUrl
      }, { fields: ['name', 'price', 'imageUrl'] })
      res.json(newDish)
    } catch (err) {
      next(err)
    }
  },

  updateDish: async(req, res, next) => {
    const { id } = req.params
    const { name, price, imageUrl } = req.body
    if (!name && name !== 0) return res.status(400).json('name 必填')
    try {
      const result = await menuModel.update({
        name,
        price,
        imageUrl
      }, {
        where: {
          id,
          isDeleted: 0
        }
      })
      if (!result[0]) return res.json(`id: ${id} not found`)
      const dish = await menuModel.findOne({
        where: {
          id,
          isDeleted: 0
        }
      })
      res.json(dish)
    } catch (err) {
      next(err)
    }
  },

  deleteDish: async(req, res, next) => {
    const { id } = req.params
    try {
      const result = await menuModel.update({
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
  }
}

module.exports = dishController
