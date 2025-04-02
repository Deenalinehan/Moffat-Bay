// Group 1 Capstone Database
// Roald Medendorp
// Austen Erickson 
// Deena Linehan 
// Giabella Apo 
// Kristina Vasquez 
// Thunder Harding 
// Violet Gonzalez 

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('MoffatBayLodge', 'Your_name', 'Your_password', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => console.log('Database connected.'))
  .catch(err => console.error('Connection failed:', err));

module.exports = sequelize; // Only export once!