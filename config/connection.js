require('dotenv').config();
const { Sequelize } = require('sequelize');

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

// Test DB connection but do NOT crash app
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');
  } catch (err) {
    console.warn('⚠️ Database connection failed, continuing startup:', err.message);
  }
})();

module.exports = sequelize;
