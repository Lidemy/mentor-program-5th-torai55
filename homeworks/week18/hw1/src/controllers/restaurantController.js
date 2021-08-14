const db = require('../models')

const prizeModel = db.Prize
const menuModel = db.Dish

const restaurantController = {
  home: (req, res, next) => {
    res.render('index', { active: 'home' })
  },

  faq: (req, res, next) => {
    res.render('faq', { active: 'faq' })
  },

  lottery: (req, res, next) => {
    res.render('lottery', { active: 'lottery' })
  },

  backend: async(req, res, next) => {
    try {
      const prizes = await prizeModel.findAll({
        where: {
          isDeleted: 0
        }
      })
      const dishes = await menuModel.findAll({
        where: {
          isDeleted: 0
        }
      })
      res.render('backend', {
        active: 'backend',
        prizes,
        dishes
      })
    } catch (err) {
      next(err)
    }
  },

  menu: async(req, res, next) => {
    try {
      res.render('menu', { active: 'menu' })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = restaurantController
