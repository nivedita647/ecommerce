'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'products',
          key:'id',
          as:'product_id_fk',
        },
        onUpdate:"CASCADE",
        onDelete:'CASCADE'
      },
      order_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'orders',
          key:'id',
          as:'order_id_fk',
        },
        onUpdate:"CASCADE",
        onDelete:'CASCADE'
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
        defaultValue:null
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order_items');
  }
};