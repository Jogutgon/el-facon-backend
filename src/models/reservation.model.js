const mongoose = require('mongoose')

const reservationSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User', //id que encontré pertenece al modelo User
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        time: {
            type: String,
            required: true

        },
        guests: {
            type: Number,
            required: true,
            min: 2,
            max:10
        },
        status:{
            type: String,
            enum: ['confirmed', 'cancelled'],
            default: 'confirmed'
        }
    }
)

const Reservation = mongoose.model('Reservation', reservationSchema)
module.exports = Reservation