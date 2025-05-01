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
  
    // Create attractions
    await Attraction.bulkCreate([
      {
        name: 'Whale Watching Tour',
        description: '3-hour guided whale watching expedition',
        price: 89.99,
        duration: 3,
        image: 'whale.jpg',
        capacity: 20
      },
      {
        name: 'Kayak Adventure',
        description: 'Guided coastal kayaking tour',
        price: 49.99,
        duration: 2.5,
        image: 'kayak.jpg',
        capacity: 15
      },
      {
        name: 'Hiking Expedition',
        description: 'Full-day guided mountain hike',
        price: 69.99,
        duration: 6,
        image: 'hiking.jpg',
        capacity: 10
      }
    ]);

    // Create bookings
    await Booking.bulkCreate([
      {
        user_id: users[0].id,
        attraction_id: attractions[0].id,
        date: '2025-10-16',
        participants: 2,
        total_price: attractions[0].price * 2,
        status: 'confirmed'
      },
      {
        user_id: users[1].id,
        attraction_id: attractions[1].id,
        date: '2025-11-02',
        participants: 4,
        total_price: attractions[1].price * 4,
        status: 'confirmed'
      },
      {
        user_id: users[2].id,
        attraction_id: attractions[2].id,
        date: '2025-12-11',
        participants: 3,
        total_price: attractions[2].price * 3,
        status: 'pending'
      }
    ]);


    console.log('Database seeded!');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    process.exit(0)
  }
}

seedDatabase();
