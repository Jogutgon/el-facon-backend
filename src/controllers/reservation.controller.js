const Reservation = require("../models/reservation.model")

const createReservation = async (req, res) => {
    try {

        if(!req.user.status) {
            return res.status(403).json({
                message: 'Tu cuenta está suspendida. No podes realizar reservas.'
            })
        }

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

        if (onlyDate < today) { 
            res.status(400)
            return res.json({ message: "No podes reservar fechas pasadas" })
        }

        if (selectDate > maxDate) {
            res.status(400)
            return res.json({ message: "Solo podes reservar hasta 3 días adelante" })
        }

        if (selectDate < now) {
            res.status(400)
            return res.json({ message: "No podes reservar en horarios pasados" })
        }


        const existingReservation = await Reservation.findOne({ date: req.body.date, time: req.body.time })
        if (existingReservation) {
            res.status(400)
            return res.json({ message: "Horario no disponible" })
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

        const reservationsDate = await Reservation.find({ date })
        const reservedTimes = reservationsDate.map(reserv => reserv.time)
        const availableTime = fixedHours.map(time => ({
            time,
            available: !reservedTimes.includes(time)
        }));

        return res.status(200).json(availableTime);

    } catch (error) {
        res.status(500).json({ message: "No se pudo mostrar la disponibilidad" })
        console.error({ message: "No se pudo mostrar la disponibilidad" })
    }
}


const getReservation = async (req, res) => {
    try {
        const userId = req.user.id;
        const reservations = await Reservation.find({ user: userId });
        return res.status(200).json(reservations);
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener reservas"
        });
    }
}


const deleteReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id)
        if (reservation === null) {
            res.status(404)
            return res.json({ message: "Reserva no encontrada" })
        }

        if(reservation.user.toString() !== req.user.id){
            res.status(403)
            return res.json({message: "No autorizado"})
        }

        const filters = { _id: req.params.id }
        await Reservation.deleteOne(filters)
        return res.status(200).json({ 
            message: "Reserva cancelada"
        });
    } catch (error) {
        res.status(500)
        return res.json({message: "Error al cancelar la reserva"})
    }
};

const AllReservations = async (req, res) => {
    try {
        const { date, time, guests, firstName, lastName } = req.query;
        const filter = {};
        if(date) {
            const startOfDay = new Date(date);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
            filter.date = { $gte: startOfDay, $lte: endOfDay}
        }

        if(time) filter.time = time;
        if(guests) filter.guests = Number(guests);
        let reservations = await Reservation.find(filter)
        .populate('user', 'firstName lastName');

        if(firstName){
            reservations = reservations.filter( r => 
                r.user?.firstName?.match(new RegExp(firstName, 'i')))
        }

        if(lastName){
            reservations = reservations.filter( r =>
                r.user?.lastName?.match(new RegExp(lastName, 'i'))
            )
        }

        return res.status(200).json({
            message: "Reservas encontradas",
            total: reservations.length,
            data: reservations
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "ERROR AL BUSCAR RESERVAS"})
    }  
}

const updateReservation = async (req, res) => {
    try {
        const { id } = req.params
        const { date, time, guests} = req.body

        const reservation = await Reservation.findById(id);
        if(!reservation){
            return res.status(404).json({
                message: 'Reserva no encontrada'
            });
        }

        const reservationDateTime = new Date(
            `${reservation.date.toISOString().split('T')[0]}T${reservation.time}`
        );
        if(reservationDateTime < new Date()){
            return res.status(400).json({
                message: 'No se pueden modificar reservas pasadas'
            });
        }
        
        const updateData = {};

        if(date !== undefined) updateData.date = date;
        if(time !== undefined) updateData.time = time;
        if(guests !== undefined) {
            if(guests < 2 || guests > 10) {
                return res.status(400).json({
                    message: "Cantidad de comensales inválida"
                })
            }
            updateData.guests = guests;
        }
        
        const updateReserv = await Reservation.findByIdAndUpdate(
            id, 
            updateData,
            { new: true, 
                runValidators: true
            }
        );

        if(!updateReserv){
            return res.status(404).json({
                message: 'Reserva no encontrada'
            });
        }

        return res.status(200).json({
            message: "Reserva actualizada", 
            data: updateReserv
        });

    } catch (error) {
       console.error(error)
       return res.status(500).json({
        message: "ERROR AL ACTUALIZAR RESERVA"}) 
    }
}

const deleteReservationByAdmin = async (req, res) => {
        try {
            const { id } = req.params;
            const reservation = await Reservation.findByIdAndDelete(id);
            if(!reservation) {
                return res.status(404).json({
                    message: "Reserva no encontrada"
                })
            }
            return res.status(200).json({
                message: "Reserva eliminada"
            })

        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: "ERROR AL ELIMINAR LA RESERVA"
            })
        }
    }


module.exports = {
    createReservation,
    availableReservation,
    getReservation,
    deleteReservationById,
    AllReservations,
    updateReservation,
    deleteReservationByAdmin
}

