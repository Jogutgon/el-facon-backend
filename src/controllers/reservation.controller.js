const Reservation = require("../models/reservation.model")

const createReservation = async (req, res) => {
    const { 
        date,
        time, 
        guests
     } = req.body


    const reservation = new Reservation({
        userId: req.user._id,
        date,
        time,
        guests
    })

    await reservation.save()
    res.status(201).json({message: 'reserva creada'})
}