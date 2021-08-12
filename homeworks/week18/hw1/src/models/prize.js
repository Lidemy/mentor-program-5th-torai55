const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Prize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Prize.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: DataTypes.STRING,
    description: DataTypes.TEXT,
    weight: {
      type: DataTypes.INTEGER,
      defaultValue: 10
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Prize'
  })
  return Prize
}
