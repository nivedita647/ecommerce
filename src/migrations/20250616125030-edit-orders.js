'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('orders','payment_id');
    await queryInterface.removeColumn('orders','receipt')
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn('orders','payment_id',{
      type: Sequelize.INTEGER,
        references:{
          model:'payments',
          key:'id',
          as:'payment_id_fk',
        },
        onUpdate:"CASCADE",
        onDelete:'CASCADE'
    });

    await queryInterface.addColumn('orders','receipt',{
      type: Sequelize.STRING
    })
  }
};
