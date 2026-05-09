const { Router } = require('express')
const { createReservation, getReservation, availableReservation, deleteReservationById } = require('../controllers/reservation.controller')
const { verifyJWT } = require('../middlewares/auth.validations')
const { expressValidations } = require('../middlewares/common.validations')
const { body, param, query } = require('express-validator')


//http://localhost:7000/reservation
const reservationRouter = Router()

reservationRouter.post('/',  
    verifyJWT,
    [
        body('date')
            .notEmpty().withMessage('Debe agregar una fecha'),

        body('time')
            .notEmpty().withMessage('Debe agregar un horario'),
        
        body('guests')
            .notEmpty().withMessage('Debe agregar cantidad de comensales')
            .isInt({ min:2, max: 10}).withMessage('Debe ser entre 2 y 10 comensales')
            .toInt()
    ],
    expressValidations,
createReservation
)


reservationRouter.get('/availability', 
    verifyJWT,
    [
        query('date')
            .notEmpty().withMessage('Debe agregar una fecha')
            .isISO8601().withMessage('Fecha inválida')
    ],
    expressValidations,
    availableReservation
)


reservationRouter.get('/all-reservations',
    verifyJWT,
    getReservation

)
//http://localhost:7000/reservation/delete-by-id/:id
reservationRouter.delete('/delete-by-id/:id', 
    verifyJWT,
    [
        param('id')
            .isMongoId().withMessage('ID inválido')
    ],
    expressValidations,
    deleteReservationById
)


module.exports = reservationRouter