const { Router } = require('express')
const { createReservation, getReservation } = require('../controllers/reservation.controller')
const { verifyJWT } = require('../middlewares/auth.validations')


//http://localhost:7000/reservation
const reservationRouter = Router()

reservationRouter.post('/', 
    [], 
    verifyJWT,
createReservation
)

reservationRouter.get('/all-reservations', 
    [],
    verifyJWT,
    getReservation

)


module.exports = reservationRouter