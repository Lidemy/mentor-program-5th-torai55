const { DataTypes } = require('sequelize')
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
  image_url: DataTypes.STRING(512),
  description: DataTypes.TEXT,
  is_deleted: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
    defaultValue: 0
  }
}, {
  freezeTableName: false
})

module.exports = {
  getAll: async(cb) => {
    // await Prize.create({name: 'yoyodiy', image_url: 'url1', description: 'nono'})
    Prize.findAll()
      .then((prizes) => cb(null, prizes))
      .catch((err) => cb(err))
  }
}
