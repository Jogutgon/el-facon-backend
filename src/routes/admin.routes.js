const { Router } = require('express')
const { verifyJWT } = require('../middlewares/auth.validations')
const { findAllUsers, updateUser, statusUser, deleteUserById } = require('../controllers/admin.controller')
const { AllReservations, updateReservation, deleteReservationByAdmin } = require('../controllers/reservation.controller')
const isAdmin = require('../middlewares/isAdmin.validation')
const adminDashboard = require('../controllers/admin.dashboard.controller')
const { expressValidations } = require('../middlewares/common.validations')
const { param, body } = require('express-validator')


//http://localhost:7000/admin
const adminRouter = Router()

//http://localhost:7000/admin/users
adminRouter.get('/users',
    verifyJWT, 
    isAdmin,
    findAllUsers 
)

adminRouter.put('/users/:id',
    verifyJWT,
    isAdmin,
    [
        param('id')
            .isMongoId().withMessage('ID inválido'),

        body('firstName')
            .trim()
            .notEmpty().withMessage('Debe agregar un nombre')
            .isLength({ min: 3 }).withMessage('Debe tener al menos 3 caracteres'),
        
        body('lastName')
            .trim()
            .notEmpty().withMessage('Debe agregar un apellido')
            .isLength({ min: 3 }).withMessage('Debe tener al menos 3 caracteres'),

        body('email')
            .trim()
            .notEmpty().withMessage('Debe agregar un email')
            .isEmail().withMessage('Debe ser formato válido (ej: text@text.com)')
            .normalizeEmail(),

        body('username')
            .trim()
            .notEmpty().withMessage('Debe agregar un nombre de usuario')
            .isLength({ min:3 }).withMessage('Debe tener al menos 3 caracteres')
        
    ],
    expressValidations, 
    updateUser
)


adminRouter.patch('/users/:id/status', 
    verifyJWT,
    isAdmin,
    [
        param('id')
            .isMongoId().withMessage('ID inválido'),

        body('status')
            .isBoolean().withMessage('Debe ser booleano')
            .toBoolean()
    ],
    expressValidations,
    statusUser
)

adminRouter.delete('/deleteUser-by-id/:id', 
    verifyJWT,
    isAdmin,
    [
        param('id')
            .isMongoId().withMessage('ID inválido')
    ],
    expressValidations,
    deleteUserById
)

adminRouter.get('/reservations',
    verifyJWT,
    AllReservations
)

adminRouter.put('/update-reservation/:id', 
    verifyJWT,
    isAdmin,
    [
        param('id')
            .isMongoId().withMessage('ID inválido'),
        
        body('date')
            .notEmpty().withMessage('Debe agregar una fecha'),

        body('time')
            .notEmpty().withMessage('Debe agregar un horario'),

        body('guests')
            .notEmpty().withMessage('Debe agregar cantidad de comensales')
            .isInt({ min:2, max:10 })
            .withMessage('Debe ser entre 2 y 10 comensales')
            .toInt()
    ],
    expressValidations,
    updateReservation
)

adminRouter.delete('/delete-reservation/:id', 
    verifyJWT,
    isAdmin,
    [
        param('id')
            .isMongoId().withMessage('ID inválido')
    ],
     expressValidations,
    deleteReservationByAdmin,
    
)

adminRouter.get('/dashboard', 
    verifyJWT,
    isAdmin,
    adminDashboard
)

module.exports = adminRouter