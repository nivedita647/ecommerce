'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('role_permission_mappings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'roles',
          key:'id',
          as:'role_id_fk'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      perms_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'permissions',
          key:'id',
          as:'perms_id_fk'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      deletedAt: {
        type: Sequelize.DATE,
        defaultValue:null
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('role_permission_mappings');
  }
};