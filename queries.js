// Group 1 Capstone Database
// Roald Medendorp
// Austen Erickson 
// Deena Linehan 
// Giabella Apo 
// Kristina Vasquez 
// Thunder Harding 
// Violet Gonzalez

const { sequelize } = require('./config/database');
const { User, Reservation } = require('./models');

async function displayData() {
  try {
    // Fetch all users
    const users = await User.findAll();
    console.log('Users:', JSON.stringify(users, null, 2));

    // Fetch reservations with user details
    const reservations = await Reservation.findAll({
      include: [{ model: User }],
    });
    console.log('Reservations:', JSON.stringify(reservations, null, 2));
  } catch (error) {
    console.error('Query failed:', error);
  } finally {
    await sequelize.close();
  }
}

displayData();