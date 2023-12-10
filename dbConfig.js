// dbConfig.js

const pgp = require('pg-promise')();

const config = {
  host: 'localhost',
  port: 5432,
  database: 'your_database_name',
  user: 'your_username',
  password: 'your_password',
};

const db = pgp(config);

module.exports = db;
