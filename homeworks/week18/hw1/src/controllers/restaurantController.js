const db = require('../models')

const prizeModel = db.Prize
const menuModel = db.Dish
const faqModel = db.Faq

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
      const options = {
        where: {
          isDeleted: 0
        }
      }
      const prizes = await prizeModel.findAll(options)
      const dishes = await menuModel.findAll(options)
      options.order = [['order', 'ASC'], ['id', 'ASC']]
      const faqs = await faqModel.findAll(options)
      res.render('backend', {
        active: 'backend',
        prizes,
        dishes,
        faqs
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
  },

  cart: async(req, res, next) => {
    try {
      res.render('cart', { active: 'cart' })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = restaurantController
