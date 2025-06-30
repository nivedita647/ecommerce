'use strict';

const { DataType } = require('sequelize-typescript');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('seller_products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      details: {
        type: Sequelize.STRING
      },
      images: {
        type: Sequelize.ARRAY(DataType.STRING)
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      seller_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'sellers',
          key:'id',
          as:'seller_id_fk'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      actual_price: {
        type: Sequelize.FLOAT
      },
      discounted_price: {
        type: Sequelize.FLOAT
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
        defaultValue: null
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('seller_products');
  }
};