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
    await queryInterface.bulkInsert('categories',[{
      name:'headphones',
      description:'best headphones',
      photo:'https://res.cloudinary.com/dzt1vosoh/image/upload/v1749816928/head_vtuurt.jpg'
      },
      {
        name:'speakers',
        description:'best speakers',
        photo:'some url'
      },
      {
        name:'camera',
        description:'cameras',
        photo:'some url'
      },
      {
        name:'gaming consoles',
        description:'for gamers',
        photo:'some url'
      },
      {
        name:'air conditioners',
        description:'air conditioners',
        photo:'some url'
      },
      {
        name:'refrigerators',
        description:'refrigerators',
        photo:'some url'
      },
      {
        name:'washing machines',
        description:'all types of washing machines',
        photo:'some url'
      },
      {
        name:'kitchen appliances',
        description:'kitchen appliances',
        photo:'some url'
      },
      {
        name:'beauty',
        description:'beauty products',
        photo:'some url'
      },
      {
        name:'health',
        description:'health and wellness',
        photo:'some url'
      },
      {
        name:'groceries',
        description:'groceries',
        photo:'some url'
      },
      {
        name:'movies',
        description:'movies',
        photo:'some url'
      },
      {
        name:'music',
        description:'music',
        photo:'some url'
      },
      {
        name:'books',
        description:'books for every reader',
        photo:'some url'
      },
      {
        name:'toys',
        description:'toys for all ages',
        photo:'some url'
      },
      {
        name:"men's fanshion",
        description:'clothes',
        photo:'some url'
      },
      {
        name:"women's fashion",
        description:'clothes',
        photo:'some url'
      },
      {
        name:'pets',
        description:'best products for your pets',
        photo:'some url'
      },
      {
        name:'home',
        description:'everyhting that your house requires',
        photo:'some url'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('categories');
  }
};
