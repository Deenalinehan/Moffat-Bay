// Group 1 Capstone Database
// Roald Medendorp
// Austen Erickson 
// Deena Linehan 
// Giabella Apo 
// Kristina Vasquez 
// Thunder Harding 
// Violet Gonzalez 

const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize connection
const sequelize = new Sequelize('MoffatBayLodge', 'your_username', 'your_password', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define Reservation model
const Reservation = sequelize.define('Reservation', {
  reservation_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  check_in_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  check_out_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  room_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  guest_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Confirmed', 'Pending'),
    defaultValue: 'Confirmed',
  },
});
// Set up associations
User.hasMany(Reservation, { foreignKey: 'user_id' });

module.exports = { sequelize, Reservation };
