const router = require('express').Router();
const { User, Reservation, Room } = require('../../models');
const withAuth = require('../../utils/auth');

//create new reservation
// will look like http://localhost:3001/api/reservations/newRes
router.post('/newRes', withAuth, async (req, res) => {
  try {

    // this bit checks to make sure there is a request body, if not, it gets mad
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body is empty' });
    }

    // this bit checks to make sure the frontend has sent the data required to create a new reservation
    const { userId, roomId, guestCount, checkInDate, checkOutDate } = req.body;
    if (!userId || !roomId || !guestCount || !checkInDate || !checkOutDate) {
      return res.status(400).json({ error: 'missing required fields. To create a new reservation, please provide the userId, roomId, guestCount, checkInDate, and checkOutDate. The reservation status is not needed as the default status for a new reservation is pending' });
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

    // create new reservation
    const newRes = await Reservation.create(
      {
        user_id: userId,
        room_id: roomId,
        guest_count: guestCount,
        check_in_date: checkInDate,
        check_out_date: checkOutDate
      }
    );

    // send back okay message
    res.status(201).json({ message: 'reservation created!', reservation: newRes });


  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong', details: err.message });
  }
});

// get one reservation
// will look like http://localhost:3001/api/reservations/getOneRes/52
router.get('/getOneRes/:resId', withAuth, async (req, res) => {

  try {

    const resData = await Reservation.findOne({
      where: { id: req.params.resId },
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
        .status(200)
        .json({ message: `reservation with id: ${req.params.resId} is not found` });
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

    if (!userResData) {
      res
        .status(200)
        .json({ message: `no reservations found for user with id: ${req.params.userId}` });
      return;
    }

    res.status(200).json({ user_reservation_data: userResData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
