// Group 1 Capstone Database
// Roald Medendorp
// Austen Erickson 
// Deena Linehan 
// Giabella Apo 
// Kristina Vasquez 
// Thunder Harding 
// Violet Gonzalez

const { sequelize, User, Reservation } = require('./models');

async function displayTables() {
  try {
    // Fetch all users
    const users = await User.findAll();
    console.log('Users:');
    console.log(JSON.stringify(users, null, 2));

    // Fetch all reservations
    const reservations = await Reservation.findAll({
      include: [{ model: User, attributes: ['first_name', 'last_name', 'email'] }],
    });
    console.log('\nReservations:');
    console.log(JSON.stringify(reservations, null, 2));
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    await sequelize.close();
  }
}

displayTables();