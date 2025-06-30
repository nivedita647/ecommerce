'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('permissions',[
      {
        'type' : 'create_user'
      },
      {
        'type' : 'read_user'
      },
      {
        'type' : 'update_user'
      },
      {
        'type' : 'delete_user'
      },
      {
        'type' : 'create_seller'
      },
      {
        'type' : 'read_seller'
      },
      {
        'type' : 'update_seller'
      },
      {
        'type' : 'delete_seller'
      },
      {
        'type' : 'create_seller_product'
      },
      {
        'type' : 'read_seller_product'
      },
      {
        'type' : 'update_seller_product'
      },
      {
        'type' : 'delete_seller_product'
      },
      {
        'type' : 'create_category'
      },
      {
        'type' : 'read_category'
      },
      {
        'type' : 'update_category'
      },
      {
        'type' : 'delete_category'
      },
      {
        'type' : 'create_address'
      },
      {
        'type' : 'read_address'
      },
      {
        'type' : 'update_address'
      },
      {
        'type' : 'delete_address'
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
      await queryInterface.bulkDelete('permissions')
  }
};
