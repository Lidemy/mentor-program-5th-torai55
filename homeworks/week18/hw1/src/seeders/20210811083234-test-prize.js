module.exports = {
  up: async(queryInterface, Sequelize) => queryInterface.bulkInsert('Prizes', [{
    name: 'HH',
    imageUrl: 'none',
    description: 'descyoyo',
    isDeleted: 0
  }]),

  down: async(queryInterface, Sequelize) => queryInterface.bulkDelete('Prizes', null, {})
}
