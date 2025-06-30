'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'orders',
          key:'id',
          as:'user_id_fk',
        },
        onUpdate:"CASCADE",
        onDelete:'CASCADE'
      },
      payment_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'payments',
          key:'id',
          as:'payment_id_fk',
        },
        onUpdate:"CASCADE",
        onDelete:'CASCADE'
      },

      address_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'addresses',
          key:'id',
          as:'address_id_fk',
        },
        onUpdate:"CASCADE",
        onDelete:'CASCADE'
      },

      receipt: {
        type: Sequelize.STRING
      },

      status:{
        type:Sequelize.ENUM('placed','pending','in-transit','completed','failed')
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
    await queryInterface.dropTable('orders');
  }
};