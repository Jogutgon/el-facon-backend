const Reservation = require("../models/reservation.model")

const createReservation = async (req, res) => {
    try {
        const {
            date,
            time,
            guests
        } = req.body


        const today = new Date(); 
        today.setHours(0, 0, 0, 0) 

        const now = new Date() 

        const selectDate = new Date(`${date}T${time}`)
       

        const [year, month, day] = date.split("-");
        const onlyDate = new Date(year, month - 1, day);  
        onlyDate.setHours(0, 0, 0, 0)

        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 3);  
        maxDate.setHours(23, 59, 59, 999)           

        if(onlyDate < today){ //fecha menor a fecha de hoy
            res.status(400)
            return res.json({messasge: "No podes reservar fechas pasadas"})
        }
        
        if(selectDate > maxDate){ 
            res.status(400)
            return res.json({message: "Solo podes reservar hasta 3 días adelante"})
        }

        if(selectDate < now) { 
            res.status(400)
            return res.json({message: "No podes reservar en horarios pasados"})
        }


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
   try {
     const {
        date,
    } = req.query;

    const fixedHours = [ 
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
        "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
    ];


    const reservationsDate = await Reservation.find({date})


    const reservedTimes = reservationsDate.map( reserv => reserv.time)

    const availableTime = fixedHours.map( time => ({
        time, 
        available: !reservedTimes.includes(time)
    })); 
    

    res.json(availableTime);

   } catch (error) {
    res.status(500).json({mensaje: "No se pudo mostrar la disponibilidad"})
    console.error({message: "No se pudo mostrar la disponibilidad"})
   }

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