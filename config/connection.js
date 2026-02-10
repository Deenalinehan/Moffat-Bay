// Load environment variables
require('dotenv').config();

const { Sequelize } = require('sequelize');

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PW,
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  }
);

// Test DB connection (non-fatal for Railway startup)
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected');
  })
  .catch(err => {
    console.error('⚠️ Database connection failed:', err.message);
  });

module.exports = sequelize;
