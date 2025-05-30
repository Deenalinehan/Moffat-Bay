const { User, Reservation, Room } = require('../models');
const sequelize = require('../config/connection')

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true });

    // Create users
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
    ], {
      // add this to apply the password hashing hook
      individualHooks: true,
      returning: true,
    });

    const rooms = await Room.bulkCreate([
      {
        type: 'double, full beds',
        price_per_night: 120
      },
      {
        type: 'single, queen bed',
        price_per_night: 135
      },
      {
        type: 'double, queen beds',
        price_per_night: 150
      },
      {
        type: 'single, king bed',
        price_per_night: 160
      },

    ]);

    // Create reservations
    await Reservation.bulkCreate([
      {
        user_id: users[0].id,
        room_id: rooms[0].id,
        check_in_date: '2025-10-15',
        check_out_date: '2025-10-20',
        guest_count: 2,
        confirmation_number: "1234567c"
      },
      {
        user_id: users[0].id,
        room_id: rooms[1].id,
        check_in_date: '2025-10-15',
        check_out_date: '2025-10-20',
        guest_count: 2,
        confirmation_number: "1234567b"
      },
      {
        user_id: users[1].id,
        room_id: rooms[1].id,
        check_in_date: '2025-11-01',
        check_out_date: '2025-11-05',
        guest_count: 4,
        confirmation_number: "1234567a"
      },
      {
        user_id: users[2].id,
        room_id: rooms[2].id,
        check_in_date: '2025-12-10',
        check_out_date: '2025-12-15',
        guest_count: 3,
        confirmation_number: "12345678"
      },
    ]);

    console.log('Database seeded!');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    process.exit(0)
  }
}

seedDatabase();
