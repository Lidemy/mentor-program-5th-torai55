const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Faq extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Faq.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    order: DataTypes.INTEGER,
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Faq',
    indexes: [
      {
        unique: true,
        fields: ['order']
      }
    ]
  })
  return Faq
}
