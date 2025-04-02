// Group 1 Capstone Database
// Roald Medendorp
// Austen Erickson 
// Deena Linehan 
// Giabella Apo 
// Kristina Vasquez 
// Thunder Harding 
// Violet Gonzalez 

// models/index.js
const sequelize = require('../config/database'); // Import existing instance

// Import your models
const User = require('./user');
const Reservation = require('./reservation');

// Define associations if needed

// Export models and sequelize
module.exports = {
  sequelize,
  User,
  Reservation
};