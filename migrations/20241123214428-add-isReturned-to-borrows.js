'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Borrows', 'isReturned', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Varsayılan değer
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Borrows', 'isReturned');
  },
};
