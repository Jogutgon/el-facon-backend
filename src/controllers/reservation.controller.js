const Reservation = require("../models/reservation.model")

const createReservation = async (req, res) => {
    try {
        const { 
        date,
        time, 
        guests
     } = req.body


    const reservation = new Reservation({
        user: req.user.id,
        date,
        time,
        guests
    })

    await reservation.save()
    res.status(201).json({message: 'reserva creada'})
    } catch (error) {
        res.status(500).json({message: "Error al crear la reserva"})
    }


}


//traer la reserva del usuario logueado
const getReservation = async (req,res) => {
    try {
        const userId = req.user.id;

        const reservations = await Reservation.find({user: userId});

        res.json(reservations)

    } catch (error) {
        
    }
}

module.exports = {
    createReservation,
    getReservation
}