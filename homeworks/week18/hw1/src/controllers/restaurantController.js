const prizeModel = require('../models').Prize

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
      res.render('backend', {
        active: 'backend',
        prizes
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = restaurantController
