const { Router } = require('express')
const { verifyJWT } = require('../middlewares/auth.validations')
const { findAllUsers, updateUser, statusUser, deleteUserById } = require('../controllers/admin.controller')
const { AllReservations, updateReservation, deleteReservationByAdmin } = require('../controllers/reservation.controller')


//http://localhost:7000/admin
const adminRouter = Router()

//http://localhost:7000/admin/users
adminRouter.get('/users',
    verifyJWT, 
    findAllUsers 
)

adminRouter.put('/users/:id', 
    verifyJWT,
    updateUser
)


adminRouter.patch('/users/:id/status', 
    verifyJWT,
    statusUser
)

adminRouter.delete('/deleteUser-by-id/:id', 
    verifyJWT,
    deleteUserById
)

adminRouter.get('/reservations',
    verifyJWT,
    AllReservations

)

adminRouter.put('/update-reservation/:id', 
    verifyJWT, 
    updateReservation
)

adminRouter.delete('/delete-reservation/:id', 
    verifyJWT, 
    deleteReservationByAdmin
)







module.exports = adminRouter