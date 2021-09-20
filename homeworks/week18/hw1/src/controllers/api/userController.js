const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userModel = require('../../models').User

const saltRounds = 10
const jwtSecretKey = process.env.JWT_KEY || 'testKey'

const userController = {
  register: async(req, res, next) => {
    const { name, email, password, confirmPassword } = req.body
    if (password !== confirmPassword) return res.json('passwords are different')
    try {
      const user = await userModel.findOne({
        where: {
          email
        }
      })

      if (user !== null) return res.json('email exist')

      const hash = await bcrypt.hash(password, saltRounds)
      const id = await userModel.create({
        name,
        email,
        password: hash
      }, { fields: ['name', 'email', 'password'] }).id

      const token = jwt.sign({
        username: name,
        userId: id
      }, jwtSecretKey, { expiresIn: '1d' })

      res.json(token)
    } catch (err) {
      next(err)
    }
  },

  login: async(req, res) => {
    const { email, password } = req.body
    const user = await userModel.findOne({
      where: {
        email
      }
    })
    if (user === null) return res.json('email or password invalid')

    const match = bcrypt.compare(password, user.password)
    if (!match) return res.json('email or password invalid')

    const token = jwt.sign({
      username: user.name,
      userId: user.id
    }, jwtSecretKey, { expiresIn: '1d' })

    res.json(token)
  },

  // JWT 無法主動登出，只能等 token 自己過期
  logout: (req, res) => {

  },

  auth: (req, res, next) => {
    const authHeader = req.get('authorization')

    try {
      const token = authHeader.replace('Bearer ', '')
      jwt.verify(token, jwtSecretKey)
      next()
    } catch (err) {
      res.set({
        'WWW-Authenticate': 'Bearer'
      })
      res.status(401).json('Unauthorized')
    }
  }
}

module.exports = userController
