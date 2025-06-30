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
    await queryInterface.bulkInsert('role_permission_mappings',[
      {
        'role_id':1,
        'perms_id':1
      },
      {
        'role_id':1,
        'perms_id':2
      },
      {
        'role_id':1,
        'perms_id':3
      },
      {
        'role_id':1,
        'perms_id':4
      },
      {
        'role_id':1,
        'perms_id':5
      },
      {
        'role_id':1,
        'perms_id':6
      },
      {
        'role_id':1,
        'perms_id':7
      },
      {
        'role_id':1,
        'perms_id':8
      },
      {
        'role_id':1,
        'perms_id':10
      },
      {
        'role_id':1,
        'perms_id':12
      },
      {
        'role_id':1,
        'perms_id':13
      },
      {
        'role_id':1,
        'perms_id':14
      },
      {
        'role_id':1,
        'perms_id':15
      },
      {
        'role_id':1,
        'perms_id':16
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
    await queryInterface.bulkDelete('role_permission_mappings',{
      where:{
        role_id:1
      }
    })
  }
};
