// pull in environment variables
require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PW,
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false, // optional: turn off SQL query logging
  }
);

sequelize.authenticate()
  .then(() => console.log('Database connected.'))
  .catch(err => console.error('Connection failed:', err));

module.exports = sequelize;