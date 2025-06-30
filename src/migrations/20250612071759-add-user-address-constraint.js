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
    await queryInterface.addConstraint('addresses',{
      fields:['user_id_fk'],
      type: 'foreign key',
      name:'user_fk',
      references:{
        table:'users',
        field:'id'
      },
      onUpdate: 'CASCADE',
      onDelete:'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('addresses','user_fk');
  }
};
