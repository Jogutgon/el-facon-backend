const Reservation = require("../models/reservation.model")

const createReservation = async (req, res) => {
    try {
        const {
            date,
            time,
            guests
        } = req.body

        const existingReservation = await Reservation.findOne({date: req.body.date, time: req.body.time})
        if (existingReservation){
            res.status(400)
            return res.json({message: "Horario no disponible"})
        }

        const reservation = new Reservation({
            user: req.user.id,
            date,
            time,
            guests
        })

        await reservation.save()
        res.status(201).json({ message: 'reserva creada' })
    } catch (error) {
        res.status(500).json({ message: "Error al crear la reserva" })
    }


}


const availableReservation = async (req, res) => {
    const {
        date,
        time
    } = req.query

    const reservationsDate = await Reservation.find({ date });

    const fixedHours = [ 
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
        "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
    ]

    const timeReservation = reservationsDate.map( reserv => reserv.time)

    res.json(timeReservation)



}


//traer la reserva del usuario logueado
const getReservation = async (req, res) => {
    try {
        const userId = req.user.id;

        const reservations = await Reservation.find({ user: userId });

        res.json(reservations)

    } catch (error) {

    }
}

module.exports = {
    createReservation,
    availableReservation,
    getReservation
}