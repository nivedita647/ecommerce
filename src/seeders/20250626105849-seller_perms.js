"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
        'role_id':3,
        'perms_id':2
      },
      {
        'role_id':3,
        'perms_id':5
      },
      {
        'role_id':3,
        'perms_id':6
      },
      {
        'role_id':3,
        'perms_id':7
      },
      {
        'role_id':3,
        'perms_id':8
      },
      {
        'role_id':3,
        'perms_id':9
      },
      {
        'role_id':3,
        'perms_id':10
      },
      {
        'role_id':3,
        'perms_id':11
      },
      {
        'role_id':3,
        'perms_id':12
      },
      {
        'role_id':3,
        'perms_id':14
      },
      {
        'role_id':3,
        'perms_id':17
      },
      {
        'role_id':3,
        'perms_id':18
      },
      {
        'role_id':3,
        'perms_id':19
      },
      {
        'role_id':3,
        'perms_id':20
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('role_permission_mappings',{
      where:{
        role_id:3
      }
    })
  },
};
