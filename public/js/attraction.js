// Group 1 Capstone Database
// Roald Medendorp
// Austen Erickson 
// Deena Linehan 
// Giabella Apo 
// Kristina Vasquez 
// Thunder Harding 
// Violet Gonzalez 

// models/attraction.js
module.exports = (sequelize, DataTypes) => {
    const Attraction = sequelize.define('Attraction', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        duration: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        capacity: {
            type: DataTypes.INTEGER,
            defaultValue: 10
        }
    });

    Attraction.associate = models => {
        Attraction.hasMany(models.Booking, { foreignKey: 'attractionId' });
    };

    return Attraction;
};

// models/booking.js
module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        participants: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        totalPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
            defaultValue: 'confirmed'
        }
    });

    Booking.associate = models => {
        Booking.belongsTo(models.User, { foreignKey: 'userId' });
        Booking.belongsTo(models.Attraction, { foreignKey: 'attractionId' });
    };

    return Booking;
};