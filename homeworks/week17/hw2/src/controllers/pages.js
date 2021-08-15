const lotteryModel = require('../models/lottery')
const ServerError = require('../error')

module.exports = {
  backend: (req, res, next) => {
    lotteryModel.getAll()
      .then((prizes) => {
        res.render('backend', { prizes })
      })
      .catch((err) => {
        next(new ServerError(err.message))
      })
  }
}
