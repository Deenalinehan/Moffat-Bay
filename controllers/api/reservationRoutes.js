const router = require('express').Router();
const { User, Reservation, Room } = require('../../models');
const withAuth = require('../../utils/auth');

// function to check to make sure confirmation  number is made of only upper/lower letters and numbers
const isValidConfirmationNumber = (code) => {
  return /^[A-Za-z0-9]{8}$/i.test(code);
};

//create new reservation
// will look like http://localhost:3001/api/reservations/newRes
router.post('/newRes', withAuth, async (req, res) => {
  try {

    // this bit checks to make sure there is a request body, if not, it gets mad
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body is empty' });
    }

    // this bit checks to make sure the frontend has sent the data required to create a new reservation
    const { userId, roomId, guestCount, checkInDate, checkOutDate, confirmationNumber } = req.body;
    if (!userId || !roomId || !guestCount || !checkInDate || !checkOutDate || !confirmationNumber) {
      return res.status(400).json({ error: 'missing required fields. To create a new reservation, please provide the userId, roomId, guestCount, checkInDate, checkOutDate, and confirmation number. The reservation status is not needed as the default status for a new reservation is pending' });
    }

    // function to validate date format using a regex or Date constructor
    const isValidDate = (dateStr) => {
      const date = new Date(dateStr);
      return !isNaN(date) && /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
    };

    // check if dates provided are valid
    if (!isValidDate(checkInDate) || !isValidDate(checkOutDate)) {
      return res.status(400).json({ error: 'checkInDate and checkOutDate must be valid dates in YYYY-MM-DD format' });
    }

    // ensure check-out is after check-in
    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      return res.status(400).json({ error: 'checkOutDate must be after checkInDate' });
    }

    // if for some reason the confirmation number is missing or is invalid, send an error
    if (!confirmationNumber || !isValidConfirmationNumber(confirmationNumber)) {
      return res.status(400).json({ error: 'Invalid or missing confirmation number format.' });
    }

    // create new reservation
    const newRes = await Reservation.create(
      {
        user_id: userId,
        room_id: roomId,
        guest_count: guestCount,
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
        confirmation_number: confirmationNumber
      }
    );

    // send back okay message
    res.status(201).json({ message: 'reservation created!', reservation: newRes });


  } catch (err) {
    // in the nearly impossible case that a confirmation number already exists, send back this error
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        error: 'Confirmation number already exists. Please retry with a new one.'
      });
    }

    console.error('Error creating reservation:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// get one reservation
// will look like http://localhost:3001/api/reservations/getOneRes/52
router.get('/getOneRes/:confId', withAuth, async (req, res) => {

  try {

    const resData = await Reservation.findOne({
      where: { confirmation_number: req.params.confId },
      include: [
        {
          model: User,
          attributes: ['first_name', 'last_name'],
        },
        {
          model: Room,
          attributes: ['type', 'price_per_night']
        }
      ]
    });

    // if the reservation record is not found, send back a "not found" message
    if (!resData) {
      res
        .status(400)
        .json({ message: `reservation with confirmation number: ${req.params.confId} is not found` });
      return;
    }

    res.status(200).json({ reservation: resData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get all reservations for userId
// will look like http://localhost:3001/api/reservations/getAllResForUser/75
router.get('/getAllResForUser/:userId', withAuth, async (req, res) => {

  try {

    const userResData = await Reservation.findAll({
      where: { user_id: req.params.userId },
      include: [
        {
          model: User,
          attributes: ['first_name', 'last_name'],
        },
        {
          model: Room,
          attributes: ['type', 'price_per_night']
        }
      ]
    });

    res.status(200).json({ user_reservation_data: userResData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
