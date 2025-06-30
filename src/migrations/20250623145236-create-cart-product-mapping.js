'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cart_product_mappings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cart_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'carts',
          key:'id',
          as:'cart_id_fk'
        },
        onDelete:"CASCADE",
        onUpdate:'CASCADE'
      },
      seller_product_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'seller_products',
          key:'id',
          as:'seller_product_id_fk'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
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
    await queryInterface.dropTable('cart_product_mappings');
  }
};