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
  chance: DataTypes.DOUBLE,
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
    fields: ['name', 'imageUrl', 'description', 'chance'] // only these columns will be validated and saved
  }),

  patch: (prize) => {
    const { id, name, imageUrl, description, chance } = prize
    return Prize.findOne({
      where: {
        id,
        is_deleted: 0
      }
    }).then((prizeInstance) => {
      if (prizeInstance === null) return Promise.reject(new ValidationError('Data Not found!'))

      // if has value then set
      // 因為都是 string，不用怕拿到 nullish
      name && (prizeInstance.name = name)
      imageUrl && (prizeInstance.imageUrl = imageUrl)
      description && (prizeInstance.description = description)
      chance && (prizeInstance.chance = chance)

      return prizeInstance.save({ fields: ['name', 'imageUrl', 'description', 'chance'] }) // saving only some fields
    }).catch((err) => Promise.reject(err))
  },

  delete: (id) => Prize.findOne({
    where: {
      id,
      is_deleted: 0
    }
  }).then((prizeInstance) => {
    if (prizeInstance === null) return Promise.reject(new ValidationError('data with id not found'))
    prizeInstance.destroy()
  })
    .catch((err) => Promise.reject(err))
}
