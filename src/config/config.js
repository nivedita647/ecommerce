module.exports = {
  "development": {
    "username": "admin",
    "password": "SRljDvRgjlUWZAHUghnUhPmg3RbKc45F",
    "database": "ecommercedb_3xud",
    "host": "dpg-d1h2l4qli9vc73b8gb1g-a.singapore-postgres.render.com",
    "dialect": "postgres",
    "dialectOptions":{
      "ssl":{
          "require":true,
          "rejectUnauthorized":false
      }
  },
    "port":5432
  },
  "test": {
    "username": "root",
    "password": "Dev@123",
    "database": "ecommerce",
    "host": "localhost",
    "dialect": "postgres"
  },  
  "production": {
    "username": "admin",
    "password": "SRljDvRgjlUWZAHUghnUhPmg3RbKc45F",
    "database": "ecommercedb_3xud",
    "host": "dpg-d1h2l4qli9vc73b8gb1g-a",
    "dialect": "postgres"
  }
}
