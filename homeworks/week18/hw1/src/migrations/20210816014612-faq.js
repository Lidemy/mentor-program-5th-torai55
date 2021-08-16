module.exports = {
  up: async(queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.addColumn('faqs', 'isDeleted', {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
        after: 'order'
      }, { transaction })
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.removeColumn('faqs', 'isDeleted')
  }
}
