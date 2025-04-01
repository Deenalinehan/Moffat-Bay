// Group 1 Capstone Database
// Roald Medendorp
// Austen Erickson 
// Deena Linehan 
// Giabella Apo 
// Kristina Vasquez 
// Thunder Harding 
// Violet Gonzalez 

const { sequelize, User, Reservation } = require('./models');

async function initializeDatabase() {
  try {
    // Sync models with the database (force: true drops existing tables)
    await sequelize.sync({ force: true });

    // Insert sample users
    const users = await User.bulkCreate([
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@google.com',
        password: 'hashed_123',
        phone_number: '+1-555-123-4567',
      },
      {
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane.smith@yahoo.com',
        password: 'hashed_456',
        phone_number: '+1-555-987-6543',
      },
      {
        first_name: 'Alice',
        last_name: 'Johnson',
        email: 'alice.johnson@hotmail.com',
        password: 'hashed_789',
        phone_number: '+1-555-222-3333',
      },
    ]);

    // Insert sample reservations
    await Reservation.bulkCreate([
      {
        user_id: 1,
        check_in_date: '2025-10-15',
        check_out_date: '2025-10-20',
        room_type: 'Ocean View',
        guest_count: 2,
      },
      {
        user_id: 2,
        check_in_date: '2025-11-01',
        check_out_date: '2025-11-05',
        room_type: 'Mountain View',
        guest_count: 4,
      },
      {
        user_id: 3,
        check_in_date: '2025-12-10',
        check_out_date: '2025-12-15',
        room_type: 'Suite',
        guest_count: 3,
        status: 'Pending',
      },
    ]);

    console.log('Database initialized!');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initializeDatabase();