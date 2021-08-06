const lotteryModel = require('../models/lottery')

module.exports = {
  get: (req, res) => {
    // const mode = req.params.mode || 'random' // getRandom or getALL
    // const dummyDB = ['AA', 'GG', 'CC']
    // const random = Math.floor(Math.random() * dummyDB.length)
    // res.send(dummyDB[random])
    lotteryModel.getAll((err, result) => {
      if (err) {
        console.log(err)
        return res.end('server error')
      }
      console.log(result[0].createdAt instanceof Date)
      res.end('success')
    })
  }
}
