const { DataTypes } = require('sequelize')
const { ValidationError } = require('sequelize')
const sequelize = require('../db')

const Prize = sequelize.define('lottery_prizes', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(256),
    allowNull: false
  },
  imageUrl: DataTypes.STRING(512),
  description: DataTypes.TEXT,
  weight: DataTypes.INTEGER.UNSIGNED, // 0 ~ 4294967295
  is_deleted: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
    defaultValue: 0
  }
}, {
  freezeTableName: false // not use auto-plural table name
})

module.exports = {
  getAll: () => Prize.findAll({ // return promise object
    where: {
      is_deleted: 0
    }
  }),

  get: (id) => Prize.findOne({ // return promise object
    where: {
      id,
      is_deleted: 0
    }
  }),

  post: (prize) => Prize.create(prize, { // return promise object
    fields: ['name', 'imageUrl', 'description', 'weight'] // only these columns will be validated and saved
  }),

  patch: (prize) => {
    const { id, name, imageUrl, description, weight } = prize
    return Prize.findOne({
      where: {
        id,
        is_deleted: 0
      }
    }).then((prizeInstance) => {
      if (prizeInstance === null) return Promise.reject(new ValidationError('Data Not found!'))

      // 因為 prize 從 post.body 拿到的都會是字串，例如 'undefined'，不用怕拿到 falsy 直接 assign 就行。
      // 如果根本沒 post 那個 argument，值會是 undefined，那就不 assign。
      name && (prizeInstance.name = name)
      imageUrl && (prizeInstance.imageUrl = imageUrl)
      description && (prizeInstance.description = description)
      weight && (prizeInstance.weight = weight)

      return prizeInstance.save({ fields: ['name', 'imageUrl', 'description', 'weight'] }) // saving only some fields
    }).catch((err) => Promise.reject(err))
  },

  delete: (id) => Prize.findOne({
    where: {
      id,
      is_deleted: 0
    }
  }).then((prizeInstance) => {
    if (prizeInstance === null) return Promise.reject(new ValidationError('data with id is not found'))
    prizeInstance.destroy()
  })
    .catch((err) => Promise.reject(err))
}
