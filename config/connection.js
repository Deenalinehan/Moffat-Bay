// Load environment variables
require('dotenv').config();

const { Sequelize } = require('sequelize');

// Use Railway MySQL vars if available, otherwise fallback to local .env
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || process.env.DB_NAME,
  process.env.MYSQL_USER || process.env.DB_USER,
  process.env.MYSQL_PASSWORD || process.env.DB_PW,
  {
    host: process.env.MYSQL_HOST || process.env.DB_HOST || 'localhost',
    port: process.env.MYSQL_PORT || process.env.DB_PORT || 3306,
    dialect: 'mysql',          // hardcoded for clarity
    logging: false,
    retry: {
      max: 5,
      match: [
        /ECONNREFUSED/,
        /ETIMEDOUT/,
        /SequelizeConnectionRefusedError/
      ]
    }
  }
);

// Test DB connection, but do NOT crash app if unavailable
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');
  } catch (err) {
    console.warn('⚠️ Database connection failed, continuing startup:', err.message);
  }
})();

module.exports = sequelize;
